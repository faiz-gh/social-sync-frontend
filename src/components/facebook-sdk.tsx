'use client';

import {useEffect} from "react";

export default function FacebookSdk() {
  useEffect(() => {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId: '{your-app-id}',
        cookie: true,
        xfbml: true,
        version: '{api-version}'
      });

      window.FB.AppEvents.logPageView();
    };

    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      // @ts-ignore
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      // @ts-ignore
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }, []);

  return (
    <script suppressHydrationWarning={true}></script>
  )
}
