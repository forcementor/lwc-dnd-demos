# Execute in Mac using: ./scripts/CreateOrg.sh
echo "*** Creating scratch Org..."
sfdx force:org:create -f config/project-scratch-def.json --setdefaultusername --setalias soDnD -d 30
echo "*** Opening scratch Org..."
sfdx force:org:open
echo "*** Pushing metadata to scratch Org..."
sfdx force:source:push
echo "*** Push data to scratch Org..."
sfdx force:apex:execute -f ./scripts/ResetData.txt
