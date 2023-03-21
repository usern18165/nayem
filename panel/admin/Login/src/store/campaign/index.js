import {
    ADD_CAMPAIGNS,
    DELETE_CAMPAIGNS,
    EDIT_CAMPAIGNS,
    SEARCH_CAMPAIGNS,
    TOGGLE_BAN,
    TOGGLE_TOP,
    MULTIPLE_DELETE
} from "./type";


import cpmImage1 from '../../pages/Campaigns/FakeImage/cmp-2.jpg';
import cpmImage2 from '../../pages/Campaigns/FakeImage/cmp-3.jpg';
import cpmImage3 from '../../pages/Campaigns/FakeImage/cmp-4.jpg';
import cpmImage4 from '../../pages/Campaigns/FakeImage/cmp-1.jpg';
import cpmImage5 from '../../pages/Campaigns/FakeImage/cmp-5.jpg';
import cpmImage6 from '../../pages/Campaigns/FakeImage/cmp-6.jpg';

const campaigns = [
    {
        "id": 1,
        "campaign_id": "2451",
        "name": "Name",
        "description": "Description name",
        "geography": ['United Kingdom', 'canada'],
        "traffic_type": ['contextual', 'display'],
        "rev_type": "percentage",
        "task_type": "SOI",
        "daily_cap": 10,
        "rate": 20.10,
        "expire_date": "20-11-2023",
        "tracking_type": "Server to Server",
        "restricted_keyword": ["hacked"],
        "device_type": {
            "android": true,
            "ios": false,
            "windows": false,
            "all": false
        },
        "contextual_url": 'http://contexturl',
        "display_url": 'http://display',
        "search_url": "http://search_url",
        "social_url": "http://social_url",
        "email_url": "http://email_url",
        "mobile_ads_url": "http://social_url",
        "landing_page": [cpmImage2, cpmImage5, cpmImage6],
        "click": 10,
        "task_complete": 1,
        "ban": true,
        "top": false

    },
    {
        "id": 2,
        "campaign_id": "2452",
        "name": "01 Name two",
        "description": "Description two",
        "geography": ['United States', 'canada'],
        "traffic_type": ['contextual', 'display'],
        "rev_type": "percentage",
        "task_type": "SOI",
        "daily_cap": 10,
        "rate": 20.10,
        "expire_date": "20-11-2023",
        "tracking_type": "Server to Server",
        "restricted_keyword": ["hacked"],
        "device_type": {
            "android": false,
            "ios": true,
            "windows": false,
            "all": false
        },
        "contextual_url": 'http://contexturl',
        "display_url": 'http://display',
        "search_url": "http://search_url",
        "social_url": "http://social_url",
        "email_url": "http://email_url",
        "mobile_ads_url": "http://social_url",
        "landing_page": [cpmImage2, cpmImage5, cpmImage6],
        "click": 10,
        "task_complete": 1,
        "ban": false,
        "top": false
    },
    {
        "id": 3,
        "campaign_id": "2453",
        "name": "01  Name three ",
        "description": "Description three",
        "geography": ['United Kingdom', 'canada'],
        "traffic_type": ['contextual', 'display'],
        "rev_type": "percentage",
        "task_type": "SOI",
        "daily_cap": 10,
        "rate": 20.10,
        "expire_date": "20-11-2023",
        "tracking_type": "Server to Server",
        "restricted_keyword": ["hacked"],
        "device_type": {
            "android": false,
            "ios": false,
            "windows": false,
            "all": true
        },
        "contextual_url": 'http://contexturl',
        "display_url": 'http://display',
        "search_url": "http://search_url",
        "social_url": "http://social_url",
        "email_url": "http://email_url",
        "mobile_ads_url": "http://social_url",
        "landing_page": [cpmImage2, cpmImage5, cpmImage6],
        "click": 10,
        "task_complete": 1,
        "ban": false,
        "top": false
    },
    {
        "id": 4,
        "campaign_id": "2454",
        "name": "01  Name Four ",
        "description": "Description Four",
        "geography": ['United States', 'canada'],
        "traffic_type": ['contextual', 'display'],
        "rev_type": "percentage",
        "task_type": "SOI",
        "daily_cap": 10,
        "rate": 20.10,
        "expire_date": "20-11-2023",
        "tracking_type": "Server to Server",
        "restricted_keyword": ["hacked"],
        "device_type": {
            "android": false,
            "ios": true,
            "windows": false,
            "all": false
        },
        "contextual_url": 'http://contexturl',
        "display_url": 'http://display',
        "search_url": "http://search_url",
        "social_url": "http://social_url",
        "email_url": "http://email_url",
        "mobile_ads_url": "http://social_url",
        "landing_page": [cpmImage2, cpmImage5, cpmImage6],
        "click": 10,
        "task_complete": 1,
        "ban": true,
        "top": false
    },
    {
        "id":5,
        "campaign_id": "2453",
        "name": "01  Name five",
        "description": "Description five",
        "geography": ['United Kingdom', 'canada'],
        "traffic_type": ['contextual', 'display'],
        "rev_type": "percentage",
        "task_type": "SOI",
        "daily_cap": 10,
        "rate": 20.10,
        "expire_date": "20-11-2023",
        "tracking_type": "Server to Server",
        "restricted_keyword": ["hacked"],
        "device_type": {
            "android": false,
            "ios": false,
            "windows": false,
            "all": true
        },
        "contextual_url": 'http://contexturl',
        "display_url": 'http://display',
        "search_url": "http://search_url",
        "social_url": "http://social_url",
        "email_url": "http://email_url",
        "mobile_ads_url": "http://social_url",
        "landing_page": [cpmImage2, cpmImage5, cpmImage6],
        "click": 10,
        "task_complete": 1,
        "ban": true,
        "top": false
    },
    {
        "id": 6,
        "campaign_id": "2456",
        "name": "01  Name six ",
        "description": "Description six",
        "geography": ['United States', 'canada'],
        "traffic_type": ['contextual', 'display'],
        "rev_type": "percentage",
        "task_type": "SOI",
        "daily_cap": 10,
        "tracking_type": "Server to Server",
        "restricted_keyword": ["hacked"],
        "device_type": {
            "android": true,
            "ios": true,
            "windows": true,
            "all": false
        },
        "rate": 20.10,
        "expire_date": "20-11-2023",
        "contextual_url": 'http://contexturl',
        "display_url": 'http://display',
        "search_url": "http://search_url",
        "social_url": "http://social_url",
        "email_url": "http://email_url",
        "mobile_ads_url": "http://social_url",
        "landing_page": [cpmImage2, cpmImage5, cpmImage6],
        "click": 10,
        "task_complete": 1,
        "ban": false,
        "top": false
    },
    {
        "id": 7,
        "campaign_id": "2457",
        "name": "http://social_url/http://social_url/http://social_url/http://social_url/ http://social_urlhttp://social_urlhttp://social_urlhttp://social_url",
        "description": "Description seven",
        "geography": ['United States', 'canada'],
        "traffic_type": ['contextual', 'display'],
        "rev_type": "percentage",
        "task_type": "SOI",
        "daily_cap": 10,
        "rate": 20.10,
        "expire_date": "20-11-2023",
        "tracking_type": "Server to Server",
        "restricted_keyword": ["hacked"],
        "device_type": {
            "android": false,
            "ios": false,
            "windows": false,
            "all": false
        },
        "contextual_url": 'http://contexturl',
        "display_url": 'http://display',
        "search_url": "http://search_url",
        "social_url": "http://social_url",
        "email_url": "http://email_url",
        "mobile_ads_url": "http://social_url/http://social_url/http://socia",
        "landing_page": [cpmImage2, cpmImage5, cpmImage6],
        "click": 10,
        "task_complete": 1,
        "ban": true,
        "top": false
    },
    {
        "id": 8,
        "campaign_id": "2458",
        "name": "01  Name eight ",
        "description": "Description eight",
        "geography": ['United States', 'canada'],
        "traffic_type": ['contextual', 'display'],
        "rev_type": "percentage",
        "task_type": "SOI",
        "daily_cap": 10,
        "rate": 20.10,
        "expire_date": "20-11-2023",
        "tracking_type": "Server to Server",
        "restricted_keyword": ["hacked"],
        "device_type": {
            "android": false,
            "ios": false,
            "windows": true,
            "all": false
        },
        "contextual_url": 'http://contexturl',
        "display_url": 'http://display',
        "search_url": "http://search_url",
        "social_url": "http://social_url",
        "email_url": "http://email_url",
        "mobile_ads_url": "http://social_url",
        "landing_page": [cpmImage2, cpmImage5, cpmImage6],
        "click": 10,
        "task_complete": 1,
        "ban": true,
        "top": true
    },
    {
        "id": 9,
        "campaign_id": "2459",
        "name": "01  Name nine",
        "description": "Description nine",
        "geography": ['United States', 'canada'],
        "traffic_type": ['contextual', 'display'],
        "rev_type": "percentage",
        "task_type": "SOI",
        "daily_cap": 10,
        "rate": 20.10,
        "expire_date": "20-11-2023",
        "tracking_type": "Server to Server",
        "restricted_keyword": ["hacked"],
        "device_type": {
            "android": false,
            "ios": true,
            "windows": true,
            "all": false
        },
        "contextual_url": 'http://contexturl',
        "display_url": 'http://display',
        "search_url": "http://search_url",
        "social_url": "http://social_url",
        "email_url": "http://email_url",
        "mobile_ads_url": "http://social_url",
        "landing_page": [cpmImage2, cpmImage5, cpmImage6],
        "click": 10,
        "task_complete": 1,
        "ban": false,
        "top": true
    },
    {
        "id": 10,
        "campaign_id": "2460",
        "name": "01  Name ten ",
        "description": "Description ten",
        "geography": ['United States', 'canada'],
        "traffic_type": ['contextual', 'display'],
        "rev_type": "percentage",
        "task_type": "SOI",
        "daily_cap": 10,
        "rate": 20.10,
        "expire_date": "20-11-2023",
        "tracking_type": "Server to Server",
        "restricted_keyword": ["hacked"],
        "device_type": {
            "android": true,
            "ios": false,
            "windows": true,
            "all": false
        },
        "contextual_url": 'http://contexturl',
        "display_url": 'http://display',
        "search_url": "http://search_url",
        "social_url": "http://social_url",
        "email_url": "http://email_url",
        "mobile_ads_url": "http://social_url",
        "landing_page": [cpmImage2, cpmImage5, cpmImage6],
        "click": 10,
        "task_complete": 1,
        "ban": false,
        "top": false
    }
]

const initialState = {
    campaigns: campaigns,
    campaign: {},
    topCampaigns: [],
};




export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_CAMPAIGNS:
            return {
                ...state,
                campaigns: [...state?.campaigns, action.payload]
            };
        case DELETE_CAMPAIGNS:
            return {
                ...state,
                campaigns: campaigns.filter((item) => item?.id !== action.payload)
            };
        //Dynamic search filter  
        case SEARCH_CAMPAIGNS:

            let conditions = [];

            if (action.payload.geography) {
                conditions.push(function (item) {
                    return item?.geography.some((geo) => geo.toLowerCase() === action.payload.geography.toLowerCase());
                });
            }

            if (action.payload.campaign_id) {
                conditions.push(function (item) {
                    return item.campaign_id === action.payload.campaign_id.trim()
                })
            }

            if (action.payload.name) {
                conditions.push(function (item) {
                    return item.name.toLowerCase().includes(action.payload.name.toLowerCase().trim());
                })
            }

            if (action.payload.ban) {
                conditions.push(function (item) {
                    return item.ban == action.payload.ban;
                })
            }

            if (action.payload.top) {
                conditions.push(function (item) {
                    return item.top == action.payload.top
                })
            }

            const itemsMatchingCondition = campaigns.filter(d => conditions.every(c => c(d)));

            return {
                ...state,
                campaigns: itemsMatchingCondition
            }

        case EDIT_CAMPAIGNS:
            return {
                ...state,
                campaigns: state.campaigns.map(item => item.id === action.payload.id ? action.payload : item)
            };
        case TOGGLE_BAN:
            return {
                ...state,
                campaigns: state.campaigns.map(item => item.id === action.payload ? { ...item, ban: !item.ban } : item)
            };
        case TOGGLE_TOP:
            return {
                ...state,
                campaigns: state.campaigns.map(item => item.id === action.payload ? { ...item, top: !item.top } : item)
            };
        case MULTIPLE_DELETE:
            const multipleCampaigns = new Set(action.payload);
            return {
                ...state,
                campaigns: campaigns.filter((item) => !multipleCampaigns.has(item.id))
            };

        default:
            return state;
    }
};
