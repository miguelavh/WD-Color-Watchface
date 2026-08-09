import {getGlobal} from "../../shared/global";
import {
    WATCHDRIP_ALARM_CONFIG_DEFAULTS,
    WATCHDRIP_APP_ID,
    WATCHDRIP_CONFIG,
    WATCHDRIP_CONFIG_DEFAULTS,
    WATCHDRIP_CONFIG_LAST_UPDATE,
    WF_INFO,
    WF_INFO_DIR_LOCAL,
    WF_INFO_FILE_LOCAL,
    WF_INFO_LAST_UPDATE,
    WF_INFO_LAST_UPDATE_ATTEMPT,
    WF_INFO_LAST_UPDATE_SUCCESS
} from "../config/global-constants";
import {json2str, str2json} from "../../shared/data";
import {MessageBuilder} from "../../shared/message";
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


let watchdrip = null;
let lastTimeValue="";
const appId = WATCHDRIP_APP_ID;

export class Watchdrip {
	
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
        this.firstRun = true;
        this.resumeCall = false;
		this.intervalTimerForce = null;
		this.nextUpdateTime= null;
		this.messageBuilder=null;
		this.connected=false;
		this.lastGraphDraw=this.timeSensor.utc-10000;
        this.refreshGraph=true;  

        this.graph = null;
    }

    //call before any usage of the class instance
    prepare() {
        watchdrip = this.globalNS.watchdrip;
    }

    deactivateGraphRefresh()
    {
        this.refreshGraph=false;
    }

    start() {
        this.checkConfigUpdate();
        this.createWatchdripDir();

		this.updatingData = false;
		
		this.nextUpdateTime=this.timeSensor.utc - 10000;
		
        //Monitor watchface activity in order to recreate connection
        if (this.isAOD()) {
			if(this.readInfo())
			{
				this.updateWidgets();
			}
			else
			{
				this.forceFetchInfo();
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
					console.log("RESUME");
					if(this.readInfo())
					{
						this.updateWidgets();
						if(this.nextUpdateTime<=this.timeSensor.utc)
						{
							this.forceFetchInfo();
						}
					}
					else
					{
						this.forceFetchInfo();
					}

                    if(this.intervalTimerForce === null)
					{
						this.updatingData = false;
						this.intervalTimerForce = this.globalNS.setInterval(() => {
							this.forceFetchInfo();			
						}, 1000);
					}
					console.log("UPDATE");
                },
                pause_call: () => {
					if (this.intervalTimerForce != null) //already started
					{
						this.globalNS.clearInterval(this.intervalTimerForce);
						this.intervalTimerForce = null;
					}					
                    this.widgetDelegateCallbackPauseCall();
                }
            });
        }
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

    //connect watch with side app
    initConnection() {
        //we need to recreate connection to force start side app
		if(this.messageBuilder===null)
		{
			this.messageBuilder = new MessageBuilder({appId});
			this.connected=false;
		}
		if(this.connected)
			this.dropConnection();
		this.messageBuilder.connect();
		this.connected=true;
    }

    dropConnection() {
		if(this.messageBuilder!==null)
		{
			this.messageBuilder.disConnect();
		}
		this.connected=false;
    }

    /*Callback which is called  when watchface deactivating (not visible)*/
    widgetDelegateCallbackPauseCall() {
        this.resumeCall = false;
        this.updatingData = false;
        this.updateFinish();
        this.dropConnection();
    }

    setUpdateValueWidgetCallback(callback) {
        this.updateValueWidgetCallback = callback;
    }

    setUpdateTimesWidgetCallback(callback) {
        this.updateTimesWidgetCallback = callback;
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
    drawGraph() {
        if (this.graph === null){
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
			this.updatingData = false;
			return;
		}

		
		if(this.nextUpdateTime<=this.timeSensor.utc)
		{
            if(this.updatingData && this.lastUpdateAttempt<(this.timeSensor.utc-20000))
                this.updatingData = false;            	
            else if(this.updatingData)
            {
                let actualValue=this.watchdripData.getTimeAgo(this.watchdripData.getBg().time);
                if(lastTimeValue!=actualValue)
                {
                    this.updateTimesWidget();
                    lastTimeValue=actualValue;
                }			
                return;
            }

            this.lastUpdateAttempt = this.timeSensor.utc;
			this.resetLastUpdate();
			this.initConnection();
			this.updatingData = true;
			this.updateStart();
			
			let params = WATCHDRIP_ALARM_CONFIG_DEFAULTS.fetchParams;
			this.messageBuilder
				.request({
					method: Commands.getInfo,
					params: params
				}, {
					timeout: 5000
				})
				.then((data) => {
					//debug.log("received data");
					let {result: info = {}} = data;
					try {
						if (data===null || data===undefined || info.error) {
							this.dropConnection();
							this.updateFinish();					
							this.updateWidgets();
							this.nextUpdateTime=this.timeSensor.utc+5000;
							this.updatingData = false;
							return;
						}
						this.lastInfoUpdate = this.saveInfo(info);
						let dataInfo = str2json(info);
						info = null;
						this.watchdripData.setData(dataInfo);
						this.watchdripData.updateTimeDiff();
						dataInfo = null;
					} catch (e) {
						debug.log("fetchInfo error:" + e);
						info = null;
					}
				})
				.catch((error) => {
					debug.log("fetch error:" + error);
				})
				.finally(() => {
					try
					{
						this.updateFinish();					
						this.updateWidgets();
						if(!this.isAOD() && this.lastUpdateSucessful && this.watchdripData.getBg().time<=(this.timeSensor.utc-305000))
						{
							this.nextUpdateTime=this.timeSensor.utc+10000;
						}
						else if(this.lastUpdateSucessful && this.watchdripData.getBg().time>(this.timeSensor.utc-305000))
						{
							this.nextUpdateTime=this.watchdripData.getBg().time+305000;
							this.dropConnection();
						}
						else if(!this.lastUpdateSucessful)
						{
							this.dropConnection();
							this.messageBuilder = null;
						}
					}catch(e)
					{
					}
					this.updatingData = false;
				});
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

    createWatchdripDir() {
        if (USE_FILE_INFO_STORAGE) {
            if (!fs.statSync(WF_INFO_DIR_LOCAL)) {
                fs.mkdirSync(WF_INFO_DIR_LOCAL);
            }
        }
    }

    readInfo() {
        let info = "";
        if (USE_FILE_INFO_STORAGE) {
            info = fs.readTextFile(WF_INFO_FILE_LOCAL);
        } else {
            info = hmFS.SysProGetChars(WF_INFO);
        }
        if (info) {
            let data = {};
            try {
                data = str2json(info);
                info = null;
                //debug.log("data was read");
                this.watchdripData.setData(data); 
                this.watchdripData.timeDiff = 0;
				this.nextUpdateTime=this.watchdripData.getBg().time+305000;
            } catch (e) {
				info = null;
				//debug.log("readInfo error:" + e);
            }
            data = null;
            return true
        }
        return false;
    }

    saveInfo(info) {
        if (USE_FILE_INFO_STORAGE) {
            fs.writeTextFile(WF_INFO_FILE_LOCAL, info);
        } else {
            hmFS.SysProSetChars(WF_INFO, info);
        }
        this.lastUpdateSucessful = true;
        let time = this.timeSensor.utc;
        hmFS.SysProSetInt64(WF_INFO_LAST_UPDATE, time);
        hmFS.SysProSetBool(WF_INFO_LAST_UPDATE_SUCCESS, this.lastUpdateSucessful);
        return time;
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

		if(this.messageBuilder!=null)
		{
			this.dropConnection();
			this.messageBuilder=null;
		}

		this.watchdripData=null;
        if (this.graph !== null){
            this.graph.clear();
        }
		this.graph=null;
    }
	
}
