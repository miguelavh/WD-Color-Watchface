import {getGlobal} from "../../shared/global";
import {
    WATCHDRIP_ALARM_CONFIG_DEFAULTS,
    WATCHDRIP_APP_ID,
    WATCHDRIP_CONFIG,
    WATCHDRIP_CONFIG_DEFAULTS,
    WATCHDRIP_CONFIG_LAST_UPDATE,
    WF_INFO,
    WF_INFO_DIR,
    WF_INFO_DIR_LOCAL,
    WF_CTRL_FILE,
    WF_INFO_FILE,
    WF_INFO_LAST_UPDATE,
    WF_INFO_LAST_UPDATE_ATTEMPT,
    WF_INFO_LAST_UPDATE_SUCCESS
} from "../config/global-constants";
import {json2str, str2json} from "../../shared/data";
import {
    APP_FETCH_TIMER_UPDATE_INTERVAL_MS,
    APP_FETCH_UPDATE_INTERVAL_MS,
    Commands,
    DATA_AOD_TIMER_UPDATE_INTERVAL_MS,
    DATA_AOD_UPDATE_INTERVAL_MS,
    DATA_STALE_TIME_MS,
    DATA_TIMER_UPDATE_INTERVAL_MS,
    DATA_UPDATE_INTERVAL_MS,
    GRAPH_LIMIT,
    MMOLL_TO_MGDL,
    USE_FILE_INFO_STORAGE,
    XDRIP_UPDATE_INTERVAL_MS
} from "../config/constants";
import * as fs from "./../../shared/fs";
import {WatchdripData} from "./watchdrip-data";
import {gotoSubpage} from "../../shared/navigate";
import {Graph} from "./graph/graph";
import {Viewport} from "./graph/viewport";
import {Path} from "../path";

let lastTimeValue="";
let lastBGTimeValue=0;

const appId = WATCHDRIP_APP_ID;
const appIdService = 25977;

function ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint8Array(buf));
}

function str2ab(str) {
    var buf = new ArrayBuffer(str.length) 
    var bufView = new Uint8Array(buf)
    for (var i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i)
    }
    return buf
}

export class WatchdripV3 {
	
    constructor() {
        this.screenType = hmSetting.getScreenType();

        this.globalNS = getGlobal();

        this.timeSensor = hmSensor.createSensor(hmSensor.id.TIME);
        this.watchdripData = new WatchdripData(this.timeSensor);

        this.lastInfoUpdate = 0;
        this.lastUpdateAttempt = null;
        this.lastUpdateSucessful = false;
        this.configLastUpdate = 0;
        this.updatingData = false;
        this.intervalTimer = null;
        this.resumeCall = false;
		this.intervalTimerForce = null;
		this.nextUpdateTime= null;
		this.lastGraphDraw=this.timeSensor.utc-10000;
        this.infoFile = new Path("full", WF_INFO_FILE);  
        this.refreshGraph=true;  

        this.graph = null;
    }

    //call before any usage of the class instance
    prepare() {
    }

    deactivateGraphRefresh()
    {
        this.refreshGraph=false;
    }

    start() {
        this.checkConfigUpdate();
        this.createWatchdripDir();
        this.updateIntervals = this.getUpdateInterval();
		this.updatingData = false;
		
		this.nextUpdateTime=this.timeSensor.utc - 10000;
		
        //Monitor watchface activity in order to recreate connection
        if (this.isAOD()) {
			if(this.readValueInfo())
			{
				this.updateWidgets();
			}
			if (this.intervalTimerForce === null) //already started
			{
                this.updatingData = false;
				this.intervalTimerForce = this.globalNS.setInterval(() => {
					this.forceFetchInfo();			
				}, 5000);
			}
        } else {
            hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
                resume_call: () => {
					if(this.readValueInfo())
					{
                        let actualValue=this.watchdripData.getTimeAgo(this.watchdripData.getBg().time);
                        if(lastBGTimeValue!==this.watchdripData.getBg().time)
                        {
		                    this.updateWidgets();
				            lastTimeValue=actualValue;
                            lastBGTimeValue=this.watchdripData.getBg().time;
                        }
			            else if(lastTimeValue!=actualValue)
			            {
				            this.updateTimesWidget();
				            lastTimeValue=actualValue;
                        }
					}
					if(this.intervalTimerForce === null)
					{
                        this.updatingData = false;
						this.intervalTimerForce = this.globalNS.setInterval(() => {
							this.forceFetchInfo();			
						}, 1000);
					}
                },
                pause_call: () => {
                    this.widgetDelegateCallbackPauseCall();
                }
            });
        }
    }

    getUpdateInterval() {
        let interval = DATA_UPDATE_INTERVAL_MS;
        if (this.isAOD()) {
            interval = DATA_AOD_UPDATE_INTERVAL_MS;
        } else if (this.isAppFetch()) {
            interval = APP_FETCH_UPDATE_INTERVAL_MS
        }
		
        return interval;
    }

    getTimerUpdateInterval() {
        let interval = DATA_TIMER_UPDATE_INTERVAL_MS;
        if (this.isAppFetch()) {
            interval = APP_FETCH_TIMER_UPDATE_INTERVAL_MS
        } else if (this.isAOD()) {
            interval = DATA_AOD_TIMER_UPDATE_INTERVAL_MS;
        }
        return interval;
    }


    isAOD() {
        return this.screenType === hmSetting.screen_type.AOD;
    }

    isTimeout(time, timeout_ms) {
        if (!time) {
            return false;
        }
        return this.timeSensor.utc - time > timeout_ms;
    }

    readLastUpdate() {
        let lastInfoUpdate = hmFS.SysProGetInt64(WF_INFO_LAST_UPDATE);
        this.lastUpdateAttempt = hmFS.SysProGetInt64(WF_INFO_LAST_UPDATE_ATTEMPT);
        this.lastUpdateSucessful = hmFS.SysProGetBool(WF_INFO_LAST_UPDATE_SUCCESS);
		
        return lastInfoUpdate;
    }

    /*Callback which is called  when watchface deactivating (not visible)*/
    widgetDelegateCallbackPauseCall() {
        this.resumeCall = false;
        this.updatingData = false;
        this.updateFinish();
    }

    setUpdateValueWidgetCallback(callback) {
        this.updateValueWidgetCallback = callback;
    }

    setUpdateTimesWidgetCallback(callback) {
        this.updateTimesWidgetCallback = callback;
    }
	
	setOnUpdateLog(callback) {
        this.updateLogCallback = callback;
    }

    setOnUpdateStartCallback(callback) {
        this.onUpdateStartCallback = callback;
    }

    setOnUpdateFinishCallback(callback) {
        this.onUpdateFinishCallback = callback;
    }

    updateWidgets() {
        this.updateValuesWidget()
        this.updateTimesWidget()
    }

    updateValuesWidget() {
        if (typeof this.updateValueWidgetCallback === "function") {
            this.updateValueWidgetCallback(this.watchdripData);
            if(this.refreshGraph)
            {
                this.drawGraph();
            }
        }
    }

    updateTimesWidget() {
        if (typeof this.updateTimesWidgetCallback === "function") {
            this.updateTimesWidgetCallback(this.watchdripData);
        }
    }

    updateLog(valor) {
        if (typeof this.updateLogCallback === "function") {
            this.updateLogCallback(valor);
        }
    }

    updateStart() {
        if (typeof this.onUpdateStartCallback === "function" && !this.isAOD()) {
            this.onUpdateStartCallback();
        }
    }

    updateFinish() {
        if (typeof this.onUpdateFinishCallback === "function") {
            this.onUpdateFinishCallback(this.lastUpdateSucessful);
        }
    }

    createGraph(x, y, width, height, lineStyles) {
        this.graph = new Graph(x, y, width, height,this.isAOD());
        this.graphLineStyles = lineStyles;
    }

    //draw graph only on normal display
    //the aod mode is glitchy
    drawGraph() {
        if (this.graph === null){// || this.isAOD()) {
            return;
        }
        if (!this.graph.visibility) {
            this.graph.clear();
            return;
        }
		
		if(this.lastGraphDraw===this.watchdripData.getBg().time)
			return;

        let graphInfo = this.watchdripData.getGraph();
        if (graphInfo.start === "") {
            return;
        }
		this.lastGraphDraw=this.watchdripData.getBg().time;
        //debug.log("draw graph");
        let viewportTop = this.watchdripData.getStatus().isMgdl ? GRAPH_LIMIT * MMOLL_TO_MGDL : GRAPH_LIMIT;
        this.graph.setViewport(new Viewport(graphInfo.start, graphInfo.end, 0, viewportTop));
        let lines = {};
        graphInfo.lines.forEach(line => {
            let name = line.name;
            if (name && name in this.graphLineStyles) {
                let lineStyle = this.graphLineStyles[name];
                //if image not defined, use default line color
                if (lineStyle.color === "" && lineStyle.imageFile === "") {
                    lineStyle.color = line.color;
                }
                let lineObj = {};
                lineObj.pointStyle = lineStyle;
                lineObj.points = line.points;
                lines[name] = lineObj;
            }
        });

        this.graph.setLines(lines);
        this.graph.draw();
    }

    isAppFetch() {
        return this.watchdripConfig.useAppFetch === true;
    }

    isServiceStarted() {
        const file_name_running = "serviceStarted.status";
        const file_name= "info.json"
        try {

            const [fs_stat, err] = hmFS.stat(file_name_running, {
                appid: appIdService
            })
            if (err == 0) {
                const [fs_stat2, err2] = hmFS.stat(file_name, {
                    appid: appIdService
                })
                if (err2 == 0) {
                    return true;
                }
            }
            else
                return false;
        } catch (error) {
            return false;
        }
        return false;
    }

    resetLastUpdate() {
        this.lastUpdateAttempt = this.timeSensor.utc;
        hmFS.SysProSetInt64(WF_INFO_LAST_UPDATE_ATTEMPT, this.lastUpdateAttempt);
        this.lastUpdateSucessful = false;
        hmFS.SysProSetBool(WF_INFO_LAST_UPDATE_SUCCESS, this.lastUpdateSucessful);
    }

    forceFetchInfo() {
		
		if(!hmBle.connectStatus())
		{
			let actualValue=this.watchdripData.getTimeAgo(this.watchdripData.getBg().time);
			if(lastTimeValue!=actualValue)
			{
				this.updateTimesWidget();
				lastTimeValue=actualValue;
			}			
			return;
		}
		
		if(this.updatingData)
			return;
		this.lastUpdateAttempt = this.timeSensor.utc;

        if(this.isServiceStarted())
        {
            if(this.nextUpdateTime<=this.timeSensor.utc)
            {
                this.resetLastUpdate();
                this.updatingData = true;
                this.readValueInfo();
                let actualValue=this.watchdripData.getTimeAgo(this.watchdripData.getBg().time);
                if(lastBGTimeValue!==this.watchdripData.getBg().time)
                {
                    this.updateWidgets();
		            lastTimeValue=actualValue;
                    lastBGTimeValue=this.watchdripData.getBg().time;
                }
	            else if(lastTimeValue!=actualValue)
	            {
		            this.updateTimesWidget();
		            lastTimeValue=actualValue;
                }
//                this.updateWidgets();
                this.updatingData = false;
            }
            else
            {
                this.firstRun = false;
                let actualValue=this.watchdripData.getTimeAgo(this.watchdripData.getBg().time);
                if(lastTimeValue!=actualValue)
                {
                    this.updateTimesWidget();
                    lastTimeValue=actualValue;
                }			
            }
        }
        else
        {
            let nextTime=this.readControl();
            if(nextTime>0 && nextTime>this.nextUpdateTime+" AOD "+this.isAOD())
                this.nextUpdateTime=nextTime;

            if(this.nextUpdateTime<=this.timeSensor.utc)
            {
                this.resetLastUpdate();
                this.updatingData = true;
                this.nextUpdateTime=this.timeSensor.utc+10000;
                this.saveControl(this.nextUpdateTime);
                hmApp.startApp({ appid: WATCHDRIP_APP_ID, url: 'page/index', param: 'update_local' });				
                this.nextUpdateTime=this.timeSensor.utc+10000;
                this.saveControl(this.nextUpdateTime);
                this.readValueInfo();

                let actualValue=this.watchdripData.getTimeAgo(this.watchdripData.getBg().time);
                if(lastBGTimeValue!==this.watchdripData.getBg().time)
                {
                    this.updateWidgets();
		            lastTimeValue=actualValue;
                    lastBGTimeValue=this.watchdripData.getBg().time;
                }
	            else if(lastTimeValue!=actualValue)
	            {
		            this.updateTimesWidget();
		            lastTimeValue=actualValue;
                }

                this.updatingData = false;
            }
            else
            {
                let actualValue=this.watchdripData.getTimeAgo(this.watchdripData.getBg().time);
                if(lastTimeValue!=actualValue)
                {
                    this.updateTimesWidget();
                    lastTimeValue=actualValue;
                }			
            }
        }
	}

    readControl() {
        let value = "0";
		try
		{
            let destination_buf = new Uint8Array(100);
            const file = hmFS.open('control.dat', hmFS.O_RDONLY);
            hmFS.read(file, destination_buf.buffer, 0, 100);
            hmFS.close(file);
            const content = ab2str(destination_buf.buffer).replace(/\0/g, '');
            destination_buf=null;
            if (content) 
			{
				return Number(content);
			}          
		} catch (error) {
            console.log("Exception reading control file "+error+" AOD "+this.isAOD());
		}			
        return 0;
    }

    saveControl(value) {
		try {
            const stringBuffer = str2ab(value.toString());
            let source_buf = new Uint8Array(stringBuffer);
            const file = hmFS.open('control.dat', hmFS.O_CREAT | hmFS.O_WRONLY);
            hmFS.write(file, source_buf.buffer, 0, source_buf.length);
            hmFS.close(file);            
		} catch (error) {
            console.log("Exception writing control file "+error+" AOD "+this.isAOD());
		}        
    }

    createWatchdripDir() {
        if (USE_FILE_INFO_STORAGE) {
            if (!fs.statSync(WF_INFO_DIR)) {
                fs.mkdirSync(WF_INFO_DIR);
            }
            if (!fs.statSync(WF_INFO_DIR_LOCAL)) {
                fs.mkdirSync(WF_INFO_DIR_LOCAL);
            }
        }
    }
	
    readValueInfo() {

        if(this.isServiceStarted())
        {
            const file_name = "info.json";
            let info = "";
            let salir=false;
      
            try {
                const fh = hmFS.open(file_name, hmFS.O_RDONLY, {
                    appid: appIdService
                })
    
                while(!salir)
                {
                    const len = 512;
                    let array_buffer = new ArrayBuffer(len);
                    hmFS.read(fh, array_buffer, 0, len);
                    info+=ab2str(array_buffer);
                    var bufView = new Uint8Array(array_buffer)
                    if(bufView[511]==0)
                    {
                        salir=true;
                    }
                }
                hmFS.close(fh);
            } catch (error) {
                info = "";
            }
            info=info.replace(/\0/g, '');

            if(info!==null && info!=undefined)
            {
                if (info) {
                    let data = {};
                    try {
                        data = str2json(info);
                        this.watchdripData.setData(data); 
                        this.watchdripData.timeDiff = 0;
                        this.nextUpdateTime=this.watchdripData.getBg().time+65000;
                        info = null;
                    } catch (e) {
                        info = null;
                        return false;
                    }
                    data = null;
                    return true
                }
            }
        }
        else
        {        
            const file_name = "info.json";
            let info = "";
            let salir=false;
    
            try {
                const fh = hmFS.open(file_name, hmFS.O_RDONLY, {
                    appid: appId
                });

                while(!salir)
                {
                    const len = 512;
                    let array_buffer = new ArrayBuffer(len);
                    hmFS.read(fh, array_buffer, 0, len);
                    info+=ab2str(array_buffer);
                    var bufView = new Uint8Array(array_buffer)
                    if(bufView[511]==0)
                    {
                        salir=true;
                    }
                }
                hmFS.close(fh);
            } catch (error) {
                info = "";
            }
            let data = {};
            if(info!==null && info!=undefined && info)
            {
                info=info.replace(/\0/g, '');
                data=JSON.parse(info)
            }
            else
                data = this.infoFile.fetchJSON();
            if (data) 
            {
                try {
                    let oldTime=this.watchdripData.getBg().time;
                    this.watchdripData.setData(data); 
                    this.watchdripData.timeDiff = 0;
                    this.nextUpdateTime=this.watchdripData.getBg().time+305000;
                    if(this.nextUpdateTime<=this.timeSensor.utc)
                    {
                        let nextTime=this.readControl();
                        if(nextTime===0)
                        {
                            this.saveControl(this.nextUpdateTime);
                        }
                        else if(this.nextUpdateTime<nextTime)
                        {
                            this.nextUpdateTime=nextTime;
                        }
                    }
                    else
                    {
                        this.saveControl(this.nextUpdateTime);
                    }
                } catch (e) {
                    //this.updateLog("readValueInfo error:" + e);
                }
                data = null;
                return true
            }
        }
        return false;
    }

    /*Read config which is defined in the app. If not defined, init config*/
    readConfig() {
        let configStr = hmFS.SysProGetChars(WATCHDRIP_CONFIG);
        if (!configStr) {
            this.watchdripConfig = WATCHDRIP_CONFIG_DEFAULTS;
            this.saveConfig();
        } else {
            try {
                this.watchdripConfig = str2json(configStr);
            } catch (e) {
				//debug.log("readConfig error:" + e);
            }
        }
    }

    saveConfig() {
        hmFS.SysProSetChars(WATCHDRIP_CONFIG, json2str(this.watchdripConfig));
        hmFS.SysProSetInt64(WATCHDRIP_CONFIG_LAST_UPDATE, this.timeSensor.utc);
    }

    /* will check last config updates to sync config with app*/
    checkConfigUpdate() {
        let configLastUpdate = hmFS.SysProGetInt64(WATCHDRIP_CONFIG_LAST_UPDATE);
        if (this.configLastUpdate !== configLastUpdate) {
            this.configLastUpdate = configLastUpdate;
            this.readConfig();
            return true;
        }
        return false
    }

    destroy() {
        if (this.intervalTimerForce != null) {
            //debug.log("stopDataUpdates");
            this.globalNS.clearInterval(this.intervalTimerForce);
            this.intervalTimerForce = null;
        }
		this.watchdripData=null;
		this.graph=null;
    }
	
}
