# MRE Blackjack
MRE Blackjack is a virtual reality game Blackjack game to be played within the Altspace social platform. This application was made using the Mixed Reality Extension. 


## Getting Started


### Prerequisites

In order to run and build this game you will need:

- Install [Node.js](https://nodejs.org/download/release/v8.12.0/) 8.12 or newer, which includes NPM 6.4.1 or newer, from nodejs.org

### How to Build & Run MRE Blackjack

1. First you'll need to deploy the node server locally

From command prompt:
* `git clone https://github.com/AltspaceVR/mre-blackjack`
* `cd mre-blackjack`
* `npm install` This will install all dependent packages. (and will do very
little if there are no changes)
* `npm run build` This should not report any errors.
* `npm start` 

2. Play the game in AltspaceVR

In AltspaceVR
* Go to your personal home
* Make sure you are signed in properly, not a guest
* Activate the Space Editor
* Click Basics group
* Click on SDKApp
* For the URL field, enter `ws://localhost:3901`
* Enter a session ID (This step will eventually be optional. For now, put in
any random value)
* Click Confirm
* If the app doesn't seem to load, click on the gear icon next the MRE object
in to the present objects list, and make sure "Is Playing" is checked.
* After the app has been placed, you will see the MRE Anchor (the white box
with red/green/blue spikes on it), rendering on top of the MRE. You can use the
anchor to move the MRE around. To hide the anchor, uncheck "Edit Mode".

### Hosting in the Cloud
In order for other AltspaceVR users to see your SDK app running, it must be hosted in a way they can connect to it. To learn about cloud hosting and other solutions, checkout [DEPLOYING.md](https://github.com/Microsoft/mixed-reality-extension-sdk/blob/master/DEPLOYING.md) in the SDK repo.

To learn more about the SDK, please read the [MRE SDK readme](
https://github.com/Microsoft/mixed-reality-extension-sdk/blob/master/README.md).



## Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.




## Authors

Tyrell Gordon


## Acknowledgments

* Eric Anderson and Soren Hannibel Soren Hannibal Nielsen for guidance
* Lingyi Qu for advice
* Big thanks to Kedoska and his engine-blackjack npm
