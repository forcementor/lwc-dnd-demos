# LWC Drag and Drop Demos

This is a reference app to demonstrate Drag and Drop functionality using Lightning Web Components in Salesforce development. 

## To Set Up The Project

This is a scratch org project that requires Visual Studio Code and SFDX. 

Once you have cloned the Git repository on your computer, authorize a DevHub by runing the SFDX command in your terminal as follows: 

    sfdx force:auth:web:login -d -a dhDnD

Then run the CreateOrg.sh script in your terminal as follows (this is for a Mac, adjust as needed for a PC):

    ./scripts/CreateOrg.sh

The script will do the following:

1 - Creating 30 day scratch Org with the alias soDnD

2 - Open the scratch Org

3 - Pushing the project metadata to the scratch Org

4 - Push sample data to the scratch Org

In your browser once the org is open, select the Drag and Drop app from the App Launcher.

Play and dissect!