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
import Home2 from './Components/Home2';
import Test from './Components/Test';
SuperTokens.init({
    appInfo: {
        appName: "my-app",
        apiDomain: "http://localhost:3001",
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
                ],
            }
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
                        <Route path="/" element={<Home2 />}/>
                        <Route path="/home" element={<Test />}/>
                    </Routes>
                </BrowserRouter>
            </SuperTokensWrapper>
  );
}

export default App;
