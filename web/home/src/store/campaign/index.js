import {
  CAMPAIGNS_ALL_CAMPAIGNS,
  CAMPAIGNS_OFFERS_CAMPAIGNS,
  CAMPAIGNS_SINGLE_CAMPAIGNS,
} from "./action";




import cpmImage1 from '../../feature/Campaigns/FakeImage/cmp-1.jpg';
import cpmImage2 from '../../feature/Campaigns/FakeImage/cmp-2.jpg';
import cpmImage3 from '../../feature/Campaigns/FakeImage/cmp-3.jpg';

const campaigns = [
  {
    "id": "01",
    "name": "Identity IQ",
    "rate": "1.75",
    "epc": "0.01",
    "image": [cpmImage3, cpmImage2, cpmImage1],
    "offer": true,
    "geography": "USA",
    "trafficType": "Traffic Type 2",
    "taskType": "Task Type 1",
    "statusType": "Status Type 1",
    "revType": "Rev Type 1",
    "deviceType": "Device Type 1",
    "supported": {
      "copy": false,
      "phone": true,
      "image": false,
      "search": true,
      "desktop": true,
      "facebook": false
    },
    "traffic_type": {
      "contextualUrl": "link/contextual",
      "displayUrl": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popular in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      "searchUrl": "link/search",
      "socialUrl": "link/social",
      "nativeUrl": "link/native",
      "mobileAdsUrl": "link/mobileAds",

    }

  },
  {
    "id": "02",
    "name": "playstation 5",
    "rate": "2.50",
    "epc": "0.05",
    "image": [cpmImage2, cpmImage1, cpmImage3],
    "offer": false,
    "geography": "Canada",
    "trafficType": "Traffic Type 2",
    "taskType": "Task Type 2",
    "statusType": "Status Type 2",
    "revType": "Rev Type 2",
    "deviceType": "Device Type 2",
    "supported": {
      "copy": false,
      "phone": true,
      "image": false,
      "search": true,
      "desktop": false,
      "facebook": true
    },
    "traffic_type": {
      "contextualUrl": "link/contextual",
      "displayUrl": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popular in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      "searchUrl": "link/search",
      "socialUrl": "link/social",
      "nativeUrl": "link/native",
      "mobileAdsUrl": "link/mobileAds",

    }
  },
  {
    "id": "03",
    "name": "credit boost",
    "rate": "0.75",
    "epc": "0.08",
    "image": [cpmImage3, cpmImage1, cpmImage1],
    "offer": false,
    "geography": "Uk",
    "trafficType": "Traffic Type 3",
    "taskType": "Task Type 3",
    "statusType": "Status Type 3",
    "revType": "Rev Type 3",
    "deviceType": "Device Type 3",
    "supported": {
      "copy": true,
      "phone": false,
      "image": true,
      "search": false,
      "desktop": true,
      "facebook": false
    },
    "traffic_type": {
      "contextualUrl": "link/contextual",
      "displayUrl": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popular in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      "searchUrl": "link/search",
      "socialUrl": "link/social",
      "nativeUrl": "link/native",
      "mobileAdsUrl": "link/mobileAds",

    }
  },
  {
    "id": "04",
    "name": "04 Identity IQ",
    "rate": "0.75",
    "epc": "1.09",
    "image": [cpmImage1, cpmImage1, cpmImage1],
    "offer": true,
    "geography": "India",
    "trafficType": "Traffic Type 4",
    "taskType": "Task Type 4",
    "statusType": "Status Type 4",
    "revType": "Rev Type 4",
    "deviceType": "Device Type 4",
    "supported": {
      "copy": true,
      "phone": false,
      "image": true,
      "search": true,
      "desktop": false,
      "facebook": true
    },
    "traffic_type": {
      "contextualUrl": "link/contextual",
      "displayUrl": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popular in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      "searchUrl": "link/search",
      "socialUrl": "link/social",
      "nativeUrl": "link/native",
      "mobileAdsUrl": "link/mobileAds",

    }
  },
  {
    "id": "05",
    "name": "Identity IQ",
    "rate": "1.75",
    "epc": "0.02",
    "image": [cpmImage1, cpmImage1, cpmImage1],
    "offer": true,
    "geography": ["USA"],
    "trafficType": "Traffic Type 1",
    "taskType": "Task Type 1",
    "statusType": "Status Type 1",
    "revType": "Rev Type 1",
    "deviceType": "Device Type 1",
    "supported": {
      "copy": false,
      "phone": true,
      "image": true,
      "search": false,
      "desktop": true,
      "facebook": false
    },
    "traffic_type": {
      "contextualUrl": "link/contextual",
      "displayUrl": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popular in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      "searchUrl": "link/search",
      "socialUrl": "link/social",
      "nativeUrl": "link/native",
      "mobileAdsUrl": "link/mobileAds",

    }
  },
  {
    "id": "06",
    "name": "Identity IQ",
    "rate": "2.50",
    "epc": "0.06",
    "image": [cpmImage2, cpmImage1, cpmImage1],
    "offer": false,
    "geography": "Canada",
    "trafficType": "Traffic Type 2",
    "taskType": "Task Type 2",
    "statusType": "Status Type 2",
    "revType": "Rev Type 2",
    "deviceType": "Device Type 2",
    "supported": {
      "copy": true,
      "phone": false,
      "image": true,
      "search": false,
      "desktop": true,
      "facebook": false
    },
    "traffic_type": {
      "contextualUrl": "link/contextual",
      "displayUrl": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popular in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      "searchUrl": "link/search",
      "socialUrl": "link/social",
      "nativeUrl": "link/native",
      "mobileAdsUrl": "link/mobileAds",

    }
  },
  {
    "id": "07",
    "name": "Identity IQ",
    "rate": "0.75",
    "epc": "0.08",
    "image": [cpmImage3, cpmImage1, cpmImage1],
    "offer": true,
    "geography": "Uk",
    "trafficType": "Traffic Type 3",
    "taskType": "Task Type 3",
    "statusType": "Status Type 3",
    "revType": "Rev Type 3",
    "deviceType": "Device Type 3",
    "supported": {
      "copy": false,
      "phone": true,
      "image": true,
      "search": true,
      "desktop": false,
      "facebook": true
    },
    "traffic_type": {
      "contextualUrl": "link/contextual",
      "displayUrl": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popular in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      "searchUrl": "link/search",
      "socialUrl": "link/social",
      "nativeUrl": "link/native",
      "mobileAdsUrl": "link/mobileAds",

    }
  },
  {
    "id": "08",
    "name": "playstation 5",
    "rate": "0.75",
    "epc": "0.07",
    "image": [cpmImage1, cpmImage1, cpmImage1],
    "offer": true,
    "geography": "India",
    "trafficType": "Traffic Type 4",
    "taskType": "Task Type 4",
    "statusType": "Status Type 4",
    "revType": "Rev Type 4",
    "deviceType": "Device Type 4",
    "supported": {
      "copy": true,
      "phone": true,
      "image": false,
      "search": true,
      "desktop": false,
      "facebook": false
    },
    "traffic_type": {
      "contextualUrl": "link/contextual",
      "displayUrl": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popular in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      "searchUrl": "link/search",
      "socialUrl": "link/social",
      "nativeUrl": "link/native",
      "mobileAdsUrl": "link/mobileAds",

    }
  },
  {
    "id": "09",
    "name": "playstation 5",
    "rate": "1.75",
    "epc": "1.03",
    "image": [cpmImage1, cpmImage1, cpmImage1],
    "offer": false,
    "geography": "USA",
    "trafficType": "Traffic Type 1",
    "taskType": "Task Type 1",
    "statusType": "Status Type 1",
    "revType": "Rev Type 1",
    "deviceType": "Device Type 1",
    "supported": {
      "copy": true,
      "phone": true,
      "image": false,
      "search": false,
      "desktop": true,
      "facebook": false
    },
    "traffic_type": {
      "contextualUrl": "link/contextual",
      "displayUrl": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popular in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      "searchUrl": "link/search",
      "socialUrl": "link/social",
      "nativeUrl": "link/native",
      "mobileAdsUrl": "link/mobileAds",

    }
  },
  {
    "id": "10",
    "name": "playstation 5",
    "rate": "2.50",
    "epc": "0.03",
    "image": [cpmImage2, cpmImage1, cpmImage1],
    "offer": true,
    "geography": "Canada",
    "trafficType": "Traffic Type 2",
    "taskType": "Task Type 2",
    "statusType": "Status Type 2",
    "revType": "Rev Type 2",
    "deviceType": "Device Type 2",
    "supported": {
      "copy": true,
      "phone": true,
      "image": false,
      "search": true,
      "desktop": false,
      "facebook": true
    },
    "traffic_type": {
      "contextualUrl": "link/contextual",
      "displayUrl": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popular in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      "searchUrl": "link/search",
      "socialUrl": "link/social",
      "nativeUrl": "link/native",
      "mobileAdsUrl": "link/mobileAds",

    }
  },
  {
    "id": "11",
    "name": "playstation 5",
    "rate": "0.75",
    "epc": "0.06",
    "image": [cpmImage3, cpmImage1, cpmImage1],
    "offer": false,
    "geography": "Uk",
    "trafficType": "Traffic Type 3",
    "taskType": "Task Type 3",
    "statusType": "Status Type 3",
    "revType": "Rev Type 3",
    "deviceType": "Device Type 3",
    "supported": {
      "copy": false,
      "phone": true,
      "image": false,
      "search": true,
      "desktop": true,
      "facebook": false
    },
    "traffic_type": {
      "contextualUrl": "link/contextual",
      "displayUrl": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popular in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      "searchUrl": "link/search",
      "socialUrl": "link/social",
      "nativeUrl": "link/native",
      "mobileAdsUrl": "link/mobileAds",

    }
  },
  {
    "id": "12",
    "name": "playstation 5",
    "rate": "0.75",
    "epc": "0.09",
    "image": [cpmImage1, cpmImage1, cpmImage1],
    "offer": true,
    "geography": "India",
    "trafficType": "Traffic Type 4",
    "taskType": "Task Type 4",
    "statusType": "Status Type 4",
    "revType": "Rev Type 4",
    "deviceType": "Device Type 4",
    "supported": {
      "copy": false,
      "phone": true,
      "image": true,
      "search": true,
      "desktop": false,
      "facebook": false
    },
    "traffic_type": {
      "contextualUrl": "link/contextual",
      "displayUrl": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popular in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      "searchUrl": "link/search",
      "socialUrl": "link/social",
      "nativeUrl": "link/native",
      "mobileAdsUrl": "link/mobileAds",

    }
  }
]

const initialState = {
  campaigns: campaigns,
  campaign: {},
  offerCampaigns: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CAMPAIGNS_ALL_CAMPAIGNS:
      return {
        ...state,
        campaigns: state?.campaigns,
      };
    case CAMPAIGNS_SINGLE_CAMPAIGNS:
      return {
        ...state,
        campaign: state?.campaigns?.find(campaign => {
          if (campaign.id === action.payload) {
            return campaign;
          }
        }),
      };
    case CAMPAIGNS_OFFERS_CAMPAIGNS:
      return {
        ...state,
        offerCampaigns: state?.campaigns?.filter(campaign => campaign.offer === true),
      };
    default:
      return state;
  }
};
