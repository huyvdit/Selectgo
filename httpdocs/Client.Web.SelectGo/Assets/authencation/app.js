
/*
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * FirebaseUI initialization to be used in a Single Page application context.
 */

/**
 * @return {!Object} The FirebaseUI config.
 */
function getUiConfig() {
    firebase.auth().languageCode = 'vi';
    return {
        'callbacks': {
            'signInSuccessUrl': '<private-site-that-only-authenticated-users-can-visit>',
            // Called when the user has been successfully signed in.
            'signInSuccessWithAuthResult': function (authResult, redirectUrl) {
                if (authResult.user) {
                    
                    handleSignedInUser(authResult.user);
                }
                if (authResult.additionalUserInfo) {
                    document.getElementById('is-new-user').textContent =
                        authResult.additionalUserInfo.isNewUser ?
                            'New User' : 'Existing User';
                }
                
                // Do not redirect.
                return false;
            }
        },
        // Opens IDP Providers sign-in flow in a popup.
        'signInFlow': 'popup',
        'signInOptions': [
            // TODO(developer): Remove the providers you don't need for your app.
            {
                provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                // Required to enable ID token credentials for this provider.
                clientId: CLIENT_ID
            },
            //{
            //    provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            //    scopes: [
            //        'public_profile',
            //        'email',
            //        'user_likes',
            //        'user_friends'
            //    ]
            //},
            //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            //firebase.auth.GithubAuthProvider.PROVIDER_ID,
            //{
            //    provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            //    // Whether the display name should be displayed in Sign Up page.
            //    requireDisplayName: true,
            //    signInMethod: getEmailSignInMethod()
            //},
            {
                provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
                recaptchaParameters: {
                    type: 'image', // 'audio'
                    size: getRecaptchaMode(),
                    badge: 'bottomright' //' bottomright' or 'inline' applies to invisible.
                },
                defaultCountry: 'VN', // Set default country to the United Kingdom (+44).
                // For prefilling the national number, set defaultNationNumber.
                // This will only be observed if only phone Auth provider is used since
                // for multiple providers, the NASCAR screen will always render first
                // with a 'sign in with phone number' button.
                defaultNationalNumber: '1234567890',
                // You can also pass the full phone number string instead of the
                // 'defaultCountry' and 'defaultNationalNumber'. However, in this case,
                // the first country ID that matches the country code will be used to
                // populate the country selector. So for countries that share the same
                // country code, the selected country may not be the expected one.
                // In that case, pass the 'defaultCountry' instead to ensure the exact
                // country is selected. The 'defaultCountry' and 'defaultNationaNumber'
                // will always have higher priority than 'loginHint' which will be ignored
                // in their favor. In this case, the default country will be 'GB' even
                // though 'loginHint' specified the country code as '+1'.
                loginHint: '+11234567890',
                // You can provide a 'whitelistedCountries' or 'blacklistedCountries' for
                // countries to select. It takes an array of either ISO (alpha-2) or
                // E164 (prefix with '+') formatted country codes. If 'defaultCountry' is
                // not whitelisted or is blacklisted, the default country will be set to
                // the first country available (alphabetical order). Notice that
                // 'whitelistedCountries' and 'blacklistedCountries' cannot be specified
                // at the same time.
                whitelistedCountries: ['VN', '+84']
            }
           
            
            //firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
        ],
        // Terms of service url.
        'tosUrl': 'https://www.google.com',
        // Privacy policy url.
        //'privacyPolicyUrl': 'https://www.google.com',
        'credentialHelper': CLIENT_ID && CLIENT_ID != 'YOUR_OAUTH_CLIENT_ID' ?
            firebaseui.auth.CredentialHelper.GOOGLE_YOLO :
            firebaseui.auth.CredentialHelper.NONE
    };
}

//// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
//// Disable auto-sign in.
//ui.disableAutoSignIn();


/**
 * Displays the UI for a signed in user.
 * @param {!firebase.User} user
 */
var handleSignedInUser = function (user) {
    document.getElementById('loading').style.display = 'block';
    document.getElementById('loaded').style.opacity = '0.1';

    document.getElementById('user-signed-in').style.display = 'block';
    document.getElementById('user-signed-out').style.display = 'none';
    document.getElementById('name').textContent = user.displayName;
    document.getElementById('email').textContent = user.email;
    document.getElementById('phone').textContent = user.phoneNumber;
    if (user.photoURL) {
        var photoURL = user.photoURL;
        // Append size to the photo URL for Google hosted images to avoid requesting
        // the image with its original resolution (using more bandwidth than needed)
        // when it is going to be presented in smaller size.
        if ((photoURL.indexOf('googleusercontent.com') != -1) ||
            (photoURL.indexOf('ggpht.com') != -1)) {
            photoURL = photoURL + '?sz=' +
                document.getElementById('photo').clientHeight;
        }
        document.getElementById('photo').src = photoURL;
        document.getElementById('photo').style.display = 'block';
    } else {
        document.getElementById('photo').style.display = 'none';
    }

    firebase.auth().currentUser.getIdToken(/* forceRefresh */ false).then(function (idToken) {
        if (idToken != undefined) {
            setTimeout(function () {
                if (window.parent.loginToken) window.parent.loginToken(idToken, function () {
                    document.getElementById('loading').textContent = ("Redirect...");
                    

                    firebase.auth().signOut();
                });
            }, 3200);
        }


        // Send token to your backend via HTTPS
        // ...
    }).catch(function (error) {
        // Handle error
    });
};


/**
 * Displays the UI for a signed out user.
 */
var handleSignedOutUser = function () {
    document.getElementById('user-signed-in').style.display = 'none';
    document.getElementById('user-signed-out').style.display = 'block';
    ui.start('#firebaseui-container', getUiConfig());
};

// Listen to change in auth state so it displays the correct UI for when
// the user is signed in or not.
firebase.auth().onAuthStateChanged(function (user) {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('loaded').style.display = 'block';
    user ? handleSignedInUser(user) : handleSignedOutUser();
});

/**
 * Deletes the user's account.
 */
var deleteAccount = function () {
    firebase.auth().currentUser.delete().catch(function (error) {
        if (error.code == 'auth/requires-recent-login') {
            // The user's credential is too old. She needs to sign in again.
            firebase.auth().signOut().then(function () {
                // The timeout allows the message to be displayed after the UI has
                // changed to the signed out state.
                setTimeout(function () {
                    alert('Please sign in again to delete your account.');
                }, 1);
            });
        }
    });
};


/**
 * Handles when the user changes the reCAPTCHA or email signInMethod config.
 */
function handleConfigChange() {
    var newRecaptchaValue = document.querySelector(
        'input[name="recaptcha"]:checked').value;
    var newEmailSignInMethodValue = document.querySelector(
        'input[name="emailSignInMethod"]:checked').value;
    location.replace(
        location.pathname + '#recaptcha=' + newRecaptchaValue +
        '&emailSignInMethod=' + newEmailSignInMethodValue);

    // Reset the inline widget so the config changes are reflected.
    ui.reset();
    ui.start('#firebaseui-container', getUiConfig());
}


/**
 * Initializes the app.
 */
var initApp = function () {

    document.getElementById('sign-out').addEventListener('click', function () {
        firebase.auth().signOut();
    });
    document.getElementById('delete-account').addEventListener(
        'click', function () {
            deleteAccount();
        });

    document.getElementById('recaptcha-normal').addEventListener(
        'change', handleConfigChange);
    document.getElementById('recaptcha-invisible').addEventListener(
        'change', handleConfigChange);
    // Check the selected reCAPTCHA mode.
    document.querySelector(
        'input[name="recaptcha"][value="' + getRecaptchaMode() + '"]')
        .checked = true;

    document.getElementById('email-signInMethod-password').addEventListener(
        'change', handleConfigChange);
    document.getElementById('email-signInMethod-emailLink').addEventListener(
        'change', handleConfigChange);
    // Check the selected email signInMethod mode.
    document.querySelector(
        'input[name="emailSignInMethod"][value="' + getEmailSignInMethod() + '"]')
        .checked = true;
};

window.addEventListener('load', initApp);