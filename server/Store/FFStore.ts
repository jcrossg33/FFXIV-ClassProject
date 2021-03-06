require('dotenv').config();
const axios = require('axios');
import * as Formator from '../utils/formatData';

const URL = 'https://xivapi.com';

export async function fetchFreeCompanyInfosByID(freeCompanyId: string) {
  try {
    const { data: fCInfos } = await axios.get(
      `${URL}/freecompany/${freeCompanyId}`,
      {
        params: { data: 'FCM' },
      }
    );

    return Formator.formatData(fCInfos);
  } catch (e) {
    console.error(e);
  }
}

// @ts-ignore
export async function fetchFreeCompanyInfos(FCName) {
  try {
    const {
      data: { Results },
    } = await axios.get(`${URL}/freecompany/search`, {
      params: {
        name: FCName,
        private_key: process.env.PRIVATE_KEY,
      },
    });
    return Formator.formatResults(Results);
  } catch (e) {
    console.error(e);
  }
}

export async function fetchMemberInfos(memberID: string) {
  try {
    const { data } = await axios.get(`${URL}/character/${memberID}`, {
      params: {
        data: 'AC,CJ,FC',
        extended: 1,
        private_key: process.env.PRIVATE_KEY,
      },
    });
    const {
      character: {
        activeclassjob: {
          class: { icon: classIcon, name: className },
          job: { icon: jobIcon, name: jobName },
          level: memberLevel,
        },
        bio,
        dc,
        freecompanyid: freeCompanyId,
        classjobs: classJobs,
        name: characterName,
        gearset: { attributes, classid, gear, level, jobid },
        nameday,
        race: { name: raceName },
        server,
        title: { icon: titleIcon, name: titleName },
        town: { icon: townIcon, name: townName },
        tribe: { name: tribeName },
        portrait,
        grandcompany: {
          company: { name: grandCompanyName },
          rank: { name: grandCompanyRank },
        },
        guardiandeity: { icon: deityIcon, name: deityName },
      },
      freecompany,
    } = Formator.formatData(data);

    const gearSet = {
      gear: Formator.formatGearSet(gear),
      attributes,
      classid,
      level,
      jobid,
    };

    const characterInfos = {
      classIcon,
      className,
      jobIcon,
      jobName,
      memberLevel,
      bio,
      dc,
      freeCompanyId,
      characterName,
      classJobs,
      nameday,
      raceName,
      server,
      titleIcon,
      titleName,
      townIcon,
      townName,
      tribeName,
      grandCompanyName,
      grandCompanyRank,
      deityIcon,
      deityName,
      portrait,
      gearSet,
    };
    return {
      characterInfos,
      freeCompanyName: freecompany ? freecompany.name : '',
    };
  } catch (e) {
    console.error(e);
  }
}

// @ts-ignore
export async function fetchMemberSearch(memberName) {
  try {
    const {
      data: { Results },
    } = await axios.get(`${URL}/character/search`, {
      params: {
        name: memberName,
        private_key: process.env.PRIVATE_KEY,
      },
    });
    return Formator.formatResults(Results);
  } catch (e) {
    console.error(e);
  }
}
