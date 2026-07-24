import {MINUTE_IN_MS, SECOND_IN_MS} from "../../shared/date";

export const DATA_TIMER_UPDATE_INTERVAL_MS = SECOND_IN_MS * 10;
export const DATA_UPDATE_INTERVAL_MS = MINUTE_IN_MS * 10;

export const APP_FETCH_TIMER_UPDATE_INTERVAL_MS = SECOND_IN_MS * 1;
export const APP_FETCH_UPDATE_INTERVAL_MS = MINUTE_IN_MS * 10;

export const DATA_AOD_TIMER_UPDATE_INTERVAL_MS = SECOND_IN_MS * 30;
export const DATA_AOD_UPDATE_INTERVAL_MS = MINUTE_IN_MS * 10;

export const DATA_STALE_TIME_MS = MINUTE_IN_MS * 2;

export const XDRIP_UPDATE_INTERVAL_MS = MINUTE_IN_MS * 5  + SECOND_IN_MS * 30;

export const ALARM_UPDATE_INTERVAL = 3 * 60; //(in seconds)

export const Commands = {
    getInfo: "CMD_GET_INFO",
    putTreatment: "CMD_PUT_TREATMENTS",
    getImg: "CMD_GET_IMG",
};

export const PROGRESS_UPDATE_INTERVAL_MS = 100;
export const PROGRESS_ANGLE_INC = 30;

export const Colors = {
  default:0x333333,
  defaultTransparent:0x059AF7,
  white:0xffffff,
  black:0x000000,
  bgHigh:0xfdef03,
  bgLow:0xfd030f,
  accent:0xffbeff37,
};

/*set to true on wf creation*/
export const TEST_DATA = false;
export const USE_FILE_INFO_STORAGE = true;

export const MMOLL_TO_MGDL = 18.0182;
export const GRAPH_LIMIT = 18;
