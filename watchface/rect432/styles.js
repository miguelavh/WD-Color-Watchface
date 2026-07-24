import {img,range} from "../../utils/helper";
import {Colors} from "../../utils/config/constants";

const bgNumArr = range(10).map((v) => {
    return img(`bgNum/${v}.png`);
});

const bgNumLowArr = range(10).map((v) => {
    return img(`bgNumLow/${v}.png`);
});

const bgNumHighArr = range(10).map((v) => {
    return img(`bgNumHigh/${v}.png`);
});

const bigNumArr = range(10).map((v) => {
    return img(`bigNum/${v}.png`);
});

const bigNumAODArr = range(10).map((v) => {
    return img(`bigNumAOD/${v}.png`);
});

// also used for bg value in AOD
const bgNumAODArr = range(10).map((v) => {
    return img(`bgNumAOD/${v}.png`);
});

// also used for bg value in AOD
const bgNumAODLowArr = range(10).map((v) => {
    return img(`bgNumAODLow/${v}.png`);
});

// also used for bg value in AOD
const bgNumAODHighArr = range(10).map((v) => {
    return img(`bgNumAODHigh/${v}.png`);
});



// also used for bg value in AOD
const bgNumStandAODArr = range(10).map((v) => {
    return img(`bgNumStandAOD/${v}.png`);
});

// also used for bg value in AOD
const bgNumStandAODLowArr = range(10).map((v) => {
    return img(`bgNumStandAODLow/${v}.png`);
});

// also used for bg value in AOD
const bgNumStandAODHighArr = range(10).map((v) => {
    return img(`bgNumStandAODHigh/${v}.png`);
});




const bgBigNumArr = range(10).map((v) => {
    return img(`bgBigNum/${v}.png`);
});

const bgBigNumLowArr = range(10).map((v) => {
    return img(`bgBigNumLow/${v}.png`);
});

const bgBigNumHighArr = range(10).map((v) => {
    return img(`bgBigNumHigh/${v}.png`);
});

// also used for bg value in AOD
const bgBigNumAODArr = range(10).map((v) => {
    return img(`bgBigNumAOD/${v}.png`);
});

// also used for bg value in AOD
const bgBigNumAODLowArr = range(10).map((v) => {
    return img(`bgBigNumAODLow/${v}.png`);
});

// also used for bg value in AOD
const bgBigNumAODHighArr = range(10).map((v) => {
    return img(`bgBigNumAODHigh/${v}.png`);
});


const smallNumArr = range(10).map((v) => {
    return img(`smallNum/${v}.png`);
});

const timeNums = range(10).map((v) => {
    return img(`time_numbers/${v}.png`);
});

const timeNumsAOD = range(10).map((v) => {
    return img(`time_numbers_aod/${v}.png`);
});

const DW = 432;
const DH = 514;
const T_WIDTH = Math.round(61/0.90);
const T_HEIGHT = Math.round(115/0.90);
const T_SPACE = Math.round(12/0.90);

const dateline = DH/2+T_HEIGHT+T_SPACE/2+Math.round(25/0.90)+7;
const statNums = range(0, 10).map((v) => {
    return img(`status_numbers/s${v}.png`);
});

export const DIGITAL_TIME_H = {
    hour_startX: Math.round(px(86)/0.90),
    hour_startY: Math.round(px(104)/0.90),
    hour_zero: true,
    hour_space: Math.round(2/0.90),
    hour_align: hmUI.align.CENTER_H,
    hour_array: timeNums,
    hour_unit_sc: img('bigNum/sp.png'), // colon
    hour_unit_tc: img('bigNum/sp.png'),
    hour_unit_en: img('bigNum/sp.png'),
    minute_zero: true,
    minute_space: Math.round(2/0.90),
    minute_align: hmUI.align.CENTER_H,
    minute_array: timeNums,
    minute_follow: 1,
    am_x: Math.round(px(161+80)/0.90),
    am_y: Math.round(px(122)/0.90),
    am_sc_path: img('bigNum/am.png'),
    am_en_path: img('bigNum/am.png'),
    pm_x: Math.round(px(161+80)/0.90),
    pm_y: Math.round(px(122)/0.90),
    pm_sc_path: img('bigNum/pm.png'),
    pm_en_path: img('bigNum/pm.png'),
    second_zero: true,
    second_startX: Math.round((37+80)/0.90),
    second_startY: dateline,
    second_align: hmUI.align.CENTER_H,
    second_array: statNums,
    second_space: 3,
    show_level: hmUI.show_level.ONLY_NORMAL
};

export const DIGITAL_TIME_H_BIG = {
    hour_startX: Math.round(px(86)/0.90),
    hour_startY: Math.round(px(285)/0.90)+7,
    hour_zero: true,
    hour_space: Math.round(2/0.90),
    hour_align: hmUI.align.CENTER_H,
    hour_array: timeNums,
    hour_unit_sc: img('bigNum/sp.png'), // colon
    hour_unit_tc: img('bigNum/sp.png'),
    hour_unit_en: img('bigNum/sp.png'),
    minute_zero: true,
    minute_space: Math.round(2/0.90),
    minute_align: hmUI.align.CENTER_H,
    minute_array: timeNums,
    minute_follow: 1,
    am_x: Math.round(px(161+80)/0.90),
    am_y: Math.round(px(285)/0.90)+7,
    am_sc_path: img('bigNum/am.png'),
    am_en_path: img('bigNum/am.png'),
    pm_x: Math.round(px(161+80)/0.90),
    pm_y: Math.round(px(285)/0.90)+7,
    pm_sc_path: img('bigNum/pm.png'),
    pm_en_path: img('bigNum/pm.png'),
    second_zero: true,
    second_startX: Math.round((37+80)/0.90),
    second_startY: dateline,
    second_align: hmUI.align.CENTER_H,
    second_array: statNums,
    second_space: 3,
    show_level: hmUI.show_level.ONLY_NORMAL
};

export const DIGITAL_TIME_V = {
	hour_zero: true,
    hour_startX: (DW-T_SPACE)/2-T_WIDTH,
    hour_startY: (DH-T_SPACE)/2-T_HEIGHT+Math.round(5/0.90),
    hour_align: hmUI.align.CENTER_H,
    hour_array: timeNums,
    hour_space: T_SPACE,
    hour_unit_sc: null, // colon
    hour_unit_tc: null,
    hour_unit_en: null,

    minute_follow: false,
    minute_zero: true,
    minute_startX: (DW-T_SPACE)/2-T_WIDTH,
    minute_startY: ((DH+T_SPACE-Math.round(11/0.90))/2)-Math.round(44/0.90)+Math.round(5/0.90),
    minute_align: hmUI.align.CENTER_H,
    minute_array: timeNums,
    minute_space: T_SPACE,

    second_zero: true,
    second_startX: Math.round((37+80)/0.90),
    second_startY: dateline,
    second_align: hmUI.align.CENTER_H,
    second_array: statNums,
    second_space: 3,
	
    am_sc_path: null,
    am_en_path: null,
    pm_sc_path: null,
    pm_en_path: null,

    show_level: hmUI.show_level.ONLY_NORMAL	
};

export const DIGITAL_TIME_AOD_V = {
    hour_startX: Math.round(px(86)/0.90),
    hour_startY: Math.round(px(104-10)/0.90),
    hour_zero: true,
    hour_space: Math.round(2/0.90),
    hour_align: hmUI.align.CENTER_H,
    hour_array: timeNumsAOD,
    hour_unit_sc: img('bigNumAOD/sp.png'), // colon
    hour_unit_tc: img('bigNumAOD/sp.png'),
    hour_unit_en: img('bigNumAOD/sp.png'),
    minute_zero: true,
    minute_space: Math.round(2/0.90),
    minute_align: hmUI.align.CENTER_H,
    minute_array: timeNumsAOD,
    minute_follow: 1,
    am_sc_path: null,
    am_en_path: null,
    pm_sc_path: null,
    pm_en_path: null,
    second_array: null,
    show_level: hmUI.show_level.ONAL_AOD
	
/*	hour_zero: true,
    hour_startX: (DW-T_SPACE)/2-T_WIDTH,
    hour_startY: (DH-T_SPACE)/2-T_HEIGHT-50,
    hour_align: hmUI.align.CENTER_H,
    hour_array: timeNumsAOD,
    hour_space: T_SPACE,
    hour_unit_sc: null, // colon
    hour_unit_tc: null,
    hour_unit_en: null,
	
    minute_follow: false,
    minute_zero: true,
    minute_startX: (DW-T_SPACE)/2-T_WIDTH,
    minute_startY: ((DH+T_SPACE-11)/2)-30-47,
    minute_align: hmUI.align.CENTER_H,
    minute_array: timeNumsAOD,
    minute_space: T_SPACE,
	
    am_sc_path: null,
    am_en_path: null,
    pm_sc_path: null,
    pm_en_path: null,
	
    second_array: null,
    show_level: hmUI.show_level.ONAL_AOD*/
};

export const LOG = {
    x: Math.round(px(0)/0.90),
    y: Math.round(px(150)/0.90),
    w: Math.round(px(390)/0.90),
    h: Math.round(px(100)/0.90),
    color: Colors.defaultTransparent,
    text_size: Math.round(px(40)/0.90),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.TOP,
    text_style: hmUI.text_style.NONE,
};


export const BG_VALUE_TEXT_IMG_AOD = {
    x: Math.round(px(71-25)/0.90),
    y: Math.round(px(257)/0.90),
    w: Math.round(px(248)/0.90),
	h_space: Math.round(2/0.90),	
    align_h: hmUI.align.CENTER_H,
    dot_image: img('bgNumAOD/d.png'),
    font_array: bgNumAODArr,
    show_level: hmUI.show_level.ONAL_AOD
};

export const BG_VALUE_TEXT_IMG_LOW_AOD = {
    x: Math.round(px(71-25)/0.90),
    y: Math.round(px(257)/0.90),
    w: Math.round(px(248)/0.90),
	h_space: Math.round(2/0.90),		
    align_h: hmUI.align.CENTER_H,
    dot_image: img('bgNumAODLow/d.png'),
    font_array: bgNumAODLowArr,
    show_level: hmUI.show_level.ONAL_AOD
};

export const BG_VALUE_TEXT_IMG_HIGH_AOD = {
    x: Math.round(px(71-25)/0.90),
    y: Math.round(px(257)/0.90),
    w: Math.round(px(248)/0.90),
	h_space: Math.round(2/0.90),		
    align_h: hmUI.align.CENTER_H,
    dot_image: img('bgNumAODHigh/d.png'),
    font_array: bgNumAODHighArr,
    show_level: hmUI.show_level.ONAL_AOD
};

export const BG_VALUE_TEXT_IMG_AOD_STAND = {
    pos_x: Math.round(px(9)/0.90),
    pos_y: Math.round(px(0)/0.90),
	w: Math.round(px(390)/0.90),
    h: Math.round(px(220)/0.90),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.CENTER_V,
    dot_image: img('bgNumStandAOD/d.png'),
    font_array: bgNumStandAODArr,
    center_x: 195,
    center_y: 110,	
	angle: 90,
    show_level: hmUI.show_level.ONAL_AOD
};

export const BG_VALUE_TEXT_IMG_LOW_AOD_STAND = {
    pos_x: Math.round(px(9)/0.90),
    pos_y: Math.round(px(0)/0.90),
	w: Math.round(px(390)/0.90),
    h: Math.round(px(220)/0.90),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.CENTER_V,
    dot_image: img('bgNumStandAODLow/d.png'),
    font_array: bgNumStandAODLowArr,
    center_x: Math.round(195/0.90),
    center_y: Math.round(110/0.90),
	angle: 90,
    show_level: hmUI.show_level.ONAL_AOD
};

export const BG_VALUE_TEXT_IMG_HIGH_AOD_STAND = {
    pos_x: Math.round(px(9)/0.90),
    pos_y: Math.round(px(0)/0.90),
	w: Math.round(px(390)/0.90),
    h: Math.round(px(220)/0.90),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.CENTER_V,
    dot_image: img('bgNumStandAODHigh/d.png'),
    font_array: bgNumStandAODHighArr,
    center_x: Math.round(195/0.90),
    center_y: Math.round(110/0.90),
	angle: 90,
    show_level: hmUI.show_level.ONAL_AOD
};

export const BG_VALUE_NO_DATA_TEXT = {
    x: Math.round(px(4+80)/0.90),
    y: Math.round(px(280)/0.90)+7,
    w: Math.round(px(160)/0.90),
    h: Math.round(px(57)/0.90),
    color: Colors.white,
    text_size: Math.round(px(42)/0.90),
    align_h: hmUI.align.RIGHT,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.NONE,
    text: 'No data',
    show_level: hmUI.show_level.ONLY_NORMAL
};

export const BG_VALUE_NO_DATA_TEXT_BIG = {
    x: Math.round(px(45)/0.90),
    y: Math.round(px(110+5)/0.90),
    w: Math.round(px(240)/0.90),
    h: Math.round(px(98)/0.90),
	h_space: Math.round(1/0.90),		
    color: Colors.white,
    text_size: Math.round(px(49)/0.90),
    align_h: hmUI.align.RIGHT,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.NONE,
    text: 'No data',
    show_level: hmUI.show_level.ONLY_NORMAL
};

export const BG_VALUE_TEXT_IMG = {
    x: Math.round(px(3+68)/0.90),
    y: Math.round(px(280)/0.90)+7,
    w: Math.round(px(164)/0.90),
	h_space: Math.round(1/0.90),		
    align_h: hmUI.align.CENTER_H,
    dot_image: img('bgNum/d.png'),
    font_array: bgNumArr,
    visible: false,
    show_level: hmUI.show_level.ONLY_NORMAL
};

export const BG_VALUE_TEXT_IMG_LOW = {
    x: Math.round(px(3+68)/0.90),
    y: Math.round(px(280)/0.90)+7,
    w: Math.round(px(164)/0.90),
	h_space: Math.round(1/0.90),		
    align_h: hmUI.align.CENTER_H,
    dot_image: img('bgNumLow/d.png'),
    font_array: bgNumLowArr,
    visible: false,
    show_level: hmUI.show_level.ONLY_NORMAL
};

export const BG_VALUE_TEXT_IMG_HIGH = {
    x: Math.round(px(3+68)/0.90),
    y: Math.round(px(280)/0.90)+7,
    w: Math.round(px(164)/0.90),
	h_space: Math.round(1/0.90),		
    align_h: hmUI.align.CENTER_H,
    dot_image: img('bgNumHigh/d.png'),
    font_array: bgNumHighArr,
    visible: false,
    show_level: hmUI.show_level.ONLY_NORMAL
};


export const BG_VALUE_TEXT_IMG_BIG = {
    x: Math.round(px(45)/0.90),
    y: Math.round(px(116+5)/0.90),
    w: Math.round(px(240)/0.90),
	h_space: Math.round(1/0.90),		
    align_h: hmUI.align.CENTER_H,
    dot_image: img('bgBigNum/d.png'),
    font_array: bgBigNumArr,
    visible: false,
    show_level: hmUI.show_level.ONLY_NORMAL
};

export const BG_VALUE_TEXT_IMG_LOW_BIG = {
    x: Math.round(px(45)/0.90),
    y: Math.round(px(116+5)/0.90),
    w: Math.round(px(240)/0.90),
	h_space: Math.round(1/0.90),		
    align_h: hmUI.align.CENTER_H,
    dot_image: img('bgBigNumLow/d.png'),
    font_array: bgBigNumLowArr,
    visible: false,
    show_level: hmUI.show_level.ONLY_NORMAL
};

export const BG_VALUE_TEXT_IMG_HIGH_BIG = {
    x: Math.round(px(45)/0.90),
    y: Math.round(px(116+5)/0.90),
    w: Math.round(px(240)/0.90),
	h_space: Math.round(1/0.90),		
    align_h: hmUI.align.CENTER_H,
    dot_image: img('bgBigNumHigh/d.png'),
    font_array: bgBigNumHighArr,
    visible: false,
    show_level: hmUI.show_level.ONLY_NORMAL
};

export const BG_VALUE_TEXT_IMG_BIG_AOD = {
    x: Math.round(px(14)/0.90),
    y: Math.round(px(183)/0.90),
    w: Math.round(px(150)/0.90),
    align_h: hmUI.align.CENTER_H,
    dot_image: img('bgBigNumAOD/d.png'),
    font_array: bgBigNumAODArr,
    visible: false,
    h_space: Math.round(1/0.90),
    show_level: hmUI.show_level.ONAL_AOD
};

export const BG_VALUE_TEXT_IMG_LOW_BIG_AOD = {
    x: Math.round(px(14)/0.90),
    y: Math.round(px(183)/0.90),
    w: Math.round(px(183)/0.90),
    align_h: hmUI.align.CENTER_H,
    dot_image: img('bgBigNumAODLow/d.png'),
    font_array: bgBigNumAODLowArr,
    visible: false,
    h_space: Math.round(1/0.90),
    show_level: hmUI.show_level.ONAL_AOD
};

export const BG_VALUE_TEXT_IMG_HIGH_BIG_AOD = {
    x: Math.round(px(14)/0.90),
    y: Math.round(px(183)/0.90),
    w: Math.round(px(183)/0.90),
    align_h: hmUI.align.CENTER_H,
    dot_image: img('bgBigNumAODHigh/d.png'),
    font_array: bgBigNumAODHighArr,
    visible: false,
    h_space: Math.round(1/0.90),
    show_level: hmUI.show_level.ONAL_AOD
};

export const BG_TIME_TEXT = {
    x: Math.round(px(128+80+20)/0.90),
    y: Math.round(px(318)/0.90)+7,
    w: Math.round(px(98)/0.90),
    h: Math.round(px(37)/0.90),
    color: Colors.defaultTransparent,
    text_size: Math.round(px(28)/0.90),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.TOP,
    text_style: hmUI.text_style.NONE,
    show_level: hmUI.show_level.ONLY_NORMAL
};

export const BG_DELTA_TEXT = {
    x: Math.round(px(119+80+20)/0.90),
    y: Math.round(px(275)/0.90)+7,
    w: Math.round(px(69)/0.90),
    h: Math.round(px(50)/0.90),
    color: Colors.defaultTransparent,
    text_size: Math.round(px(33)/0.90),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.TOP,
    text_style: hmUI.text_style.NONE,
    show_level: hmUI.show_level.ONLY_NORMAL
};

export const BG_TIME_TEXT_AOD = {
    x: Math.round(px(45+150+10-40)/0.90),
    y: Math.round(px(180)/0.90),
    w: Math.round(px(150)/0.90),
    color: Colors.defaultTransparent,
    text_size: Math.round(px(40)/0.90),
    align_h: hmUI.align.LEFT,
    align_v: hmUI.align.TOP,
    text_style: hmUI.text_style.NONE,
    show_level: hmUI.show_level.ONAL_AOD
};

export const BG_DELTA_TEXT_AOD = {
    x: Math.round(px(35)/0.90),
    y: Math.round(px(180)/0.90),
    w: Math.round(px(110)/0.90),
    color: Colors.defaultTransparent,
    text_size: Math.round(px(40)/0.90),
    align_h: hmUI.align.RIGHT,
    align_v: hmUI.align.TOP,
    text_style: hmUI.text_style.NONE,
    show_level: hmUI.show_level.ONAL_AOD
};


export const BG_TIME_TEXT_BIG = {
    x: Math.round(px(98+80)/0.90),
    y: Math.round(px(214+5+5)/0.90),
    w: Math.round(px(122)/0.90),
    h: Math.round(px(49)/0.90),
    color: Colors.defaultTransparent,
    text_size: Math.round(px(37)/0.90),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.TOP,
    text_style: hmUI.text_style.NONE,
    show_level: hmUI.show_level.ONLY_NORMAL
};

export const BG_DELTA_TEXT_BIG = {
    x: Math.round(px(12+80)/0.90),
    y: Math.round(px(214+5+5)/0.90),
    w: Math.round(px(74)/0.90),
    h: Math.round(px(49)/0.90),
    color: Colors.defaultTransparent,
    text_size: Math.round(px(37)/0.90),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.TOP,
    text_style: hmUI.text_style.NONE,
    show_level: hmUI.show_level.ONLY_NORMAL
};


export const BG_TREND_IMAGE = {
    src: 'watchdrip/arrows/None.png',
    x: Math.round(px(178+80+20)/0.90),
    y: Math.round(px(275)/0.90)+7,
    w: Math.round(px(55)/0.90),
    h: Math.round(px(55)/0.90),
    show_level: hmUI.show_level.ONLY_NORMAL
};

export const BG_TREND_IMAGE_AOD = {
    src: 'watchdrip/arrowsAOD/None.png',
	
    x: Math.round(px(71-25+248)/0.90),
    y: Math.round(px(257)/0.90),
    w: Math.round(px(55)/0.90),
	align_h: hmUI.align.LEFT,
//    x: px(94+80),
//    y: px(391),
//    w: px(55),
    h: Math.round(px(55)/0.90),
    show_level: hmUI.show_level.ONAL_AOD
};

export const BG_TREND_IMAGE_AOD_STAND = {
    src: 'watchdrip/arrowsAOD/None.png',
    x: Math.round(px(74)/0.90),
    y: Math.round(px(360)/0.90),
    w: Math.round(px(82)/0.90),
    h: Math.round(px(82)/0.90),
    center_x: Math.round(px(41)/0.90),
    center_y: Math.round(px(41)/0.90),
	angle: 90,
    show_level: hmUI.show_level.ONAL_AOD
};


export const BG_TREND_IMAGE_BIG = {
    src: 'watchdrip/arrows/None.png',
    x: Math.round(px(290-10)/0.90),
    y: Math.round(px(116+5)/0.90),
    w: Math.round(px(55)/0.90),
    h: Math.round(px(55)/0.90),
    show_level: hmUI.show_level.ONLY_NORMAL
};

export const BG_TREND_IMAGE_BIG_AOD = {
    src: 'watchdrip/arrowsAOD/None.png',
    x: Math.round(px(183)/0.90),
    y: Math.round(px(177)/0.90),
    w: Math.round(px(55)/0.90),
    h: Math.round(px(55)/0.90),
    show_level: hmUI.show_level.ONAL_AOD
};

export const BG_STALE_IMG = {
//    x: px(69-45),
//    y: px(135-10),
    x: Math.round(px(15+80)/0.90),
    y: Math.round(px(318)/0.90)+7,
    src: 'watchdrip/stale.png',
    visible: false,
    show_level: hmUI.show_level.ONLY_NORMAL
};

export const BG_STALE_IMG_BIG = {
//    x: px(69-45),
//    y: px(135-10),
    x: Math.round(px(45)/0.90),
    y: Math.round(px(177)/0.90),
	w: Math.round(px(240)/0.90),
    src: 'watchdrip/stale.png',
    visible: false,
    show_level: hmUI.show_level.ONLY_NORMAL
};

export const IMG_LOADING_PROGRESS = {
    x: Math.round(px(93+80)/0.90),
    y: Math.round(px(293)/0.90)+7,
    src: 'watchdrip/progress.png',
    angle: 0,
    center_x: 27,
    center_y: 27,
    visible: false,
    show_level: hmUI.show_level.ONLY_NORMAL
};

export const IMG_LOADING_PROGRESS_BIG = {
    x: Math.round(px(45+77+15)/0.90),
    y: Math.round(px(128+5)/0.90),
    src: 'watchdrip/progress_big.png',
    angle: 0,
    center_x: Math.round(px(43)/0.90),
    center_y: Math.round(px(43)/0.90),
    visible: false,
    show_level: hmUI.show_level.ONLY_NORMAL
};

export const IMG_STATUS_BT_DISCONNECTED = {
    x: Math.round(px(40)/0.90),
    y: Math.round(px(60)/0.90)+7,
    src: img('status/bt_disconnect.png'),
    type: hmUI.system_status.DISCONNECT,
    show_level: hmUI.show_level.ONLY_NORMAL
};

export const CUSTOM_WIDGETS = {
    NONE: 100001,
    GRAPH: 100011,
    GRAPH_LOW_HIGH_LINES: 100012,
    BIG_BG: 100015
};
// END edit group treatments aaps/xdrip data


// BEGIN edit group default styles
const editWidgetW = Math.round(px(83)/0.90);
const editWidgetH = Math.round(px(74)/0.90);
const editWidgetIconHeight = Math.round(px(37)/0.90);
const editWidgetIconWidth = Math.round(px(37)/0.90);
const editWidgetIconMargin = Math.round(px(9)/0.90);
const editWidgetArcRadius = Math.round(px(15)/0.90);
const editWidgetArcLineWidth = Math.round(px(10)/0.90);
const editWidgetArcMarginX = Math.round(px(1)/0.90);
const editWidgetArcMarginTop = Math.round(px(-1)/0.90);

const editGroupTypes = [
    {
        type: CUSTOM_WIDGETS.NONE,
        title_sc: 'None',
        title_tc: 'None',
        title_en: 'None',
        preview: img('widgets/empty.png')
    }
];

const editGroupTypesLarge = editGroupTypes.concat(
    [
        {
            type: CUSTOM_WIDGETS.GRAPH_LOW_HIGH_LINES,
            title_sc: 'xDrip graph low/high lines',
            title_tc: 'xDrip graph low/high lines',
            title_en: 'xDrip graph low/high lines',
            preview: img('widgets/GRAPH_LOW_HIGH_LINES.png')
        },
        {
            type: CUSTOM_WIDGETS.GRAPH,
            title_sc: 'xDrip graph',
            title_tc: 'xDrip graph',
            title_en: 'xDrip graph',
            preview: img('widgets/GRAPH.png')
        },
        {
            type: CUSTOM_WIDGETS.BIG_BG,
            title_sc: 'Big BG values',
            title_tc: 'Big BG values',
            title_en: 'Big BG values',
            preview: img('widgets/BIG.png')
        }		
    ]
);

export const EDIT_GROUP_W_DEFAULTS = {
    x: Math.round(px(30)/0.90),
    w: Math.round(px(330)/0.90),
    h: Math.round(px(80)/0.90),
    select_image: img('mask/select-large.png'),
    un_select_image: img('mask/un_select-large.png'),
    optional_types: editGroupTypes,
    count: editGroupTypes.length,
    tips_BG: img('mask/text_tag-wide.png'),
    tips_width: Math.round(px(181)/0.90),
    tips_margin: Math.round(px(2)/0.90), // optional, default value: 0
    show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONLY_EDIT,
    tips_x: Math.round(px(0)/0.90),
    tips_y: Math.round(px(-55)/0.90)
};

// Default styles for all IMG widgets 
export const EDIT_DEFAULT_IMG = {
    // TODO: make images full width and remove this
    w: px(editWidgetW), // full width to center
    show_level: hmUI.show_level.ONLY_NORMAL
};

// Default styles for all ARC_PROGRESS Left widgets
const EDIT_DEFAULT_ARC_PROGRESS_LEFT = {
    radius: px(editWidgetArcRadius),
    start_angle: 180,
    end_angle: 360,
    color: Colors.accent,
    line_width: editWidgetArcLineWidth,
    show_level: hmUI.show_level.ONLY_NORMAL
};
// Default styles for all ARC_PROGRESS RIGHT widgets
const EDIT_DEFAULT_ARC_PROGRESS_RIGHT = {
    radius: px(editWidgetArcRadius),
    start_angle: 180,
    end_angle: 0,
    color: Colors.accent,
    line_width: editWidgetArcLineWidth,
    show_level: hmUI.show_level.ONLY_NORMAL
};

export const EDIT_DEFAULT_ARC_PROGRESS = {
    left: EDIT_DEFAULT_ARC_PROGRESS_LEFT,
    right: EDIT_DEFAULT_ARC_PROGRESS_RIGHT

};

// Default styles for all TEXT_IMG widgets
export const EDIT_DEFAULT_TEXT_IMG = {
    w: px(editWidgetW),
    padding: false,
    h_space: Math.round(1/0.90),
    align_h: hmUI.align.CENTER_H,
    show_level: hmUI.show_level.ONLY_NORMAL,
    font_array: smallNumArr,
    dot_image: img('smallNum/d.png'),
    negative_image: img('smallNum/negative_image.png')
};
// END edit group default styles


// BEGIN Top Edit Widgets
const topX = Math.round(px(152)/0.90);
const topY = Math.round(px(134)/0.90);

export const EDIT_TOP_GROUP = {
    edit_id: 101,
    x: px(topX),
    y: px(topY),
    default_type: hmUI.edit_type.HEART
}; 

// Styles for all Top IMG widgets
export const EDIT_TOP_IMG = {
    x: px(topX),
    y: px(topY)
};

// Styles for all Top ARC_PROGRESS widgets
const EDIT_TOP_ARC_PROGRESS_LEFT = {
    center_x: px(topX + editWidgetArcRadius + editWidgetArcMarginX + (editWidgetArcLineWidth / 2)),
    center_y: px(topY + editWidgetArcRadius + editWidgetArcMarginTop + (editWidgetArcLineWidth / 2))
};
// Styles for all Top ARC_PROGRESS Right widgets
const EDIT_TOP_ARC_PROGRESS_RIGHT = {
    center_x: px(topX + editWidgetArcRadius + (2 * editWidgetArcMarginX) + editWidgetIconWidth + (editWidgetArcLineWidth / 2) + 1),
    center_y: px(topY + editWidgetArcRadius + editWidgetArcMarginTop + (editWidgetArcLineWidth / 2))
};
export const EDIT_TOP_ARC_PROGRESS = {
    left: EDIT_TOP_ARC_PROGRESS_LEFT,
    right: EDIT_TOP_ARC_PROGRESS_RIGHT
};

// Styles for all Top TEXT_IMG widgets
export const EDIT_TOP_TEXT_IMG = {
    x: px(topX),
    y: px(topY + editWidgetIconHeight + editWidgetIconMargin)
};
// END Top Left Edit Widgets


// BEGIN Wide Edit Widgets
const largeX = Math.round(px(80)/0.90);
const largeY = Math.round(px(348)/0.90);

export const EDIT_GROUP_DEFAULTS = {
    w: px(editWidgetW),
    h: px(editWidgetH),
    select_image: img('mask/select.png'),
    un_select_image: img('mask/un_select.png'),
    optional_types: editGroupTypes,
    count: editGroupTypes.length,
    tips_BG: img('mask/text_tag.png'),
    tips_x: Math.round(px(-43)/0.90),
    tips_y: Math.round(px(-55)/0.90),
    tips_width: Math.round(px(108)/0.90),
    tips_margin: Math.round(px(1)/0.90), // optional, default value: 0
    show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONLY_EDIT
};

export const EDIT_LARGE_GROUP = {
    edit_id: 112,
    select_image: img('mask/select-large.png'),
    un_select_image: img('mask/un_select-large.png'),
    x: Math.round(px(30)/0.90),
    y: Math.round(px(208)/0.90),
    w: Math.round(px(330)/0.90),
    h: Math.round(px(88)/0.90),
    optional_types: editGroupTypesLarge,
    count: editGroupTypesLarge.length,
    default_type: CUSTOM_WIDGETS.GRAPH_LOW_HIGH_LINES,
};

// Default styles for all Wide IMG widgets
const LARGE_IMAGE_Y_SHIFT = 37;

export const EDIT_LARGE_IMG = {
    x: px(largeX),
    y: px(largeY + LARGE_IMAGE_Y_SHIFT)
};

// Styles for all Wide ARC_PROGRESS widgets
const EDIT_LARGE_ARC_PROGRESS_LEFT = {
    center_x: px(largeX + editWidgetArcRadius + editWidgetArcMarginX + (editWidgetArcLineWidth / 2)),
    center_y: px(largeY + LARGE_IMAGE_Y_SHIFT + editWidgetArcRadius + editWidgetArcMarginTop + (editWidgetArcLineWidth / 2))
};
// Styles for all Wide ARC_PROGRESS Right widgets
const EDIT_LARGE_ARC_PROGRESS_RIGHT = {
    center_x: px(largeX + editWidgetArcRadius + (2 * editWidgetArcMarginX) + editWidgetIconWidth + (editWidgetArcLineWidth / 2) + 1),
    center_y: px(largeY + LARGE_IMAGE_Y_SHIFT + editWidgetArcRadius + editWidgetArcMarginTop + (editWidgetArcLineWidth / 2))
};
export const EDIT_LARGE_ARC_PROGRESS = {
    left: EDIT_LARGE_ARC_PROGRESS_LEFT,
    right: EDIT_LARGE_ARC_PROGRESS_RIGHT
};

// Styles for all Wide TEXT_IMG widgets
export const EDIT_LARGE_TEXT_IMG = {
    x: px(largeX),
    y: px(largeY)
};
// END Wide Edit Widgets


export const GRAPH_SETTINGS = {
    x: Math.round(px(30)/0.90),
    y: Math.round(px(122)/0.90),
    w: Math.round(px(330)/0.90),
    h: Math.round(px(172)/0.90),
    point_size: Math.round(px(8)/0.90),
    treatment_point_size: Math.round(px(12)/0.90),
    line_size: Math.round(px(2)/0.90)
};

// END Edit Widgets

