export const CAMPAIGNS_ALL_CAMPAIGNS = 'CAMPAIGNS_ALL_CAMPAIGNS';
export const CAMPAIGNS_SINGLE_CAMPAIGNS = 'CAMPAIGNS_SINGLE_CAMPAIGNS';
export const CAMPAIGNS_OFFERS_CAMPAIGNS = 'CAMPAIGNS_OFFERS_CAMPAIGNS';

export function campaignAllCampaign() {
  return { type: CAMPAIGNS_ALL_CAMPAIGNS };
}
export function campaignSingleCampaign(campaignId) {
  return { type: CAMPAIGNS_SINGLE_CAMPAIGNS, payload: campaignId };
}
export function campaignOfferCampaigns() {
  return { type: CAMPAIGNS_OFFERS_CAMPAIGNS};
}

