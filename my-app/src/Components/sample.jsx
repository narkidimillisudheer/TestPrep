import React from 'react';

import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import Passwordless from "supertokens-auth-react/recipe/passwordless";
import ThirdParty from "supertokens-auth-react/recipe/thirdparty";
import Session from "supertokens-auth-react/recipe/session";

SuperTokens.init({
    appInfo: {
        appName: "my-app",
        apiDomain: "http://localhost:3000",
        websiteDomain: "http://localhost:3000",
        apiBasePath: "/zauth",
        websiteBasePath: "/auth2"
    },
    recipeList: [
        Passwordless.init({
            contactMethod: "EMAIL",
        }),
        ThirdParty.init({
            signInAndUpFeature: {
                providers: [
                    ThirdParty.Github.init(),
                    ThirdParty.Google.init(),
                    ThirdParty.Facebook.init(),
                    ThirdParty.Apple.init(),
                ],
            }
        }),
        Session.init()
    ]
});


/* Your App */
class App extends React.Component {
    render() {
        return (
            <SuperTokensWrapper>
                {/*Your app components*/}
            </SuperTokensWrapper>
        );
    }
}