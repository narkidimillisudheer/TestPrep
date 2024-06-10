import logo from './logo.svg';
import './App.css';
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import Passwordless from "supertokens-auth-react/recipe/passwordless";
import ThirdParty from "supertokens-auth-react/recipe/thirdparty";
import Session from "supertokens-auth-react/recipe/session";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import { ThirdPartyPreBuiltUI } from 'supertokens-auth-react/recipe/thirdparty/prebuiltui';
import { PasswordlessPreBuiltUI } from 'supertokens-auth-react/recipe/passwordless/prebuiltui';
import * as reactRouterDom from "react-router-dom";
import Test2 from './Components/Test2';
import QaDisplay2 from './Components/Qa/QaDisplay2';
import HomePage from './Components/Homepage/HomePage';
SuperTokens.init({
    appInfo: {
        appName: "my-app",
        apiDomain: "http://localhost:3001",
        websiteDomain: "http://localhost:3000",
        apiBasePath: "/zauth",
        websiteBasePath: "/auth2"
    },
    getRedirectionURL: async (context) => {
        if (context.action === "SUCCESS" && context.newSessionCreated) {
            if (context.redirectToPath !== undefined) {
                // we are navigating back to where the user was before they authenticated
                return context.redirectToPath;
            }
            return "/home";
        }
        return undefined;
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
                ],
            },
        }),
        Session.init()
    ]
});
function App() {
  return (
    <SuperTokensWrapper>
                <BrowserRouter>
                    <Routes>
                        {/*This renders the login UI on the /auth2 route*/}
                        {getSuperTokensRoutesForReactRouterDom(reactRouterDom, [ThirdPartyPreBuiltUI, PasswordlessPreBuiltUI])}
                        {/*Your app routes*/}
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/home" element={<Test2 />}/>
                    </Routes>
                </BrowserRouter>
            </SuperTokensWrapper>
  );
}

export default App;
