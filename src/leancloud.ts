// src/leancloud.ts
import AV from 'leancloud-storage';

AV.init({
  appId: process.env.NEXT_PUBLIC_LEANCLOUD_APP_ID!,
  appKey: process.env.NEXT_PUBLIC_LEANCLOUD_APP_KEY!,
  serverURL: process.env.NEXT_PUBLIC_LEANCLOUD_SERVER_URL!,
});

export default AV;
