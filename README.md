# LWC Drag and Drop Demos

This is a reference app to demonstrate drag and drop functionality using Lightning Web Components in Salesforce development. 

The sample apps are intended to demonstrate the basic usage of standard HTML5 drag and drop functionality using Lightning Web Components. Two samples Apps are included, and the architectural approach is designed to reuse the custom base components for both loosely and tightly coupled apps. 

The first app uses a tightly coupled model and a component hierarchy, and leverages custom events for messaging activated by handling and raising standard HTML5 drag and drop events within that hierarchy.    

The other app uses a loosly coupled model allowing reuse of the custom base components that can be dropped and configured on an App Page. Cross component messaging is accomplished using a pubsub eventing model. Reusability of the base components is accomplished by adding a wrapper component that handles the custom events and brokers them with pubsub events allowing cross page messaging.

One key architectural approach is to minimize the data transfer of messaging payloads using custom eventing payloads instead of the data transfer capability of the HTML drag and drop events, as would be the case with standard web development. 

A second key architectural approach is to use the data processing logic capabilities of the Lightning Web Component framework, and to manage the reactive rerendering of the components in response to the drag and drop events processed rather than the direct manipulation of the DOM as would be the case with standard web development.

And finally, validation of the associated UI rules is accomplished with JavaScript logic written into the event handlers, rather than implementation of the standard HTML5 drop effects to control allowable behavior. 

## To Set Up The Project

This is a scratch org project that requires Visual Studio Code and SFDX. 

Once you have cloned the Git repository on your computer, authorize a DevHub by running the following SFDX command in your terminal (name the alias however you want): 

    sfdx force:auth:web:login -d -a dhDnD

Next run the CreateOrg.sh script in your terminal as follows (this is for a Mac, adjust as needed for a PC):

    ./scripts/CreateOrg.sh

## The script will do the following:

1 - Creates 30 day scratch Org with the alias soDnD

2 - Opens the scratch Org

3 - Pushes the project metadata to the scratch Org

4 - Pushes some sample Account, Contact and Case data to the scratch Org

Once the org is open in your browser, select the Drag and Drop app from the App Launcher.

Play and dissect!
