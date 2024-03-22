// Globals
var currItem = 0;
var helper;
var layout;

// InitLoad
sap.ui.getCore().attachInit(function() {

    setTimeout(function() {

        if (sap.ui.Device.system.tablet && sap.ui.Device.os.name === "iOS") {
            if (window.innerHeight > window.innerWidth) {
                sap.ui.Device.orientation.landscape = false;
                sap.ui.Device.orientation.portrait = true;
            } else {
                sap.ui.Device.orientation.landscape = true;
                sap.ui.Device.orientation.portrait = false;
            }
        }

        if (sap.ui.Device.system.tablet && sap.ui.Device.orientation.portrait) {
            diaTurn.open();
            setTimeout(function() {
                diaTurn.close();
            }, 2000);
        }

        inFilterMaster.rerender();
        pullUpdate.setVisible(sap.ui.Device.support.touch);

        $(document).ajaxComplete(function() {
            sap.ui.core.BusyIndicator.hide();
        });

        if (typeof AppCache === "undefined") {
            butBackMaster.setVisible(false);
        }

        InitButControl();

        // Initialize Layout helper
        jQuery.sap.require("sap.f.FlexibleColumnLayoutSemanticHelper");
        var oSettings = {
					defaultTwoColumnLayoutType: sap.f.LayoutType.TwoColumnsMidExpanded,
					defaultThreeColumnLayoutType: sap.f.LayoutType.ThreeColumnsMidExpanded
				};
        helper = new sap.f.FlexibleColumnLayoutSemanticHelper.getInstanceFor(oLayoutMain, oSettings);


        // Intial with Master Section only
        layout = helper.getNextUIState(0);
        oLayoutMain.setLayout(layout.layout);


    }, 200);
});
