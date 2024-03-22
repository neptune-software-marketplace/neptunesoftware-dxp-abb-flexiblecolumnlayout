function setHeaderText() {
    if (typeof modelMasterList.oData.length !== 'undefined') {
        txtTitleMaster.setText(txtTranslateHeader.getText() + " (" + modelMasterList.oData.length + ")");
    } else {
        txtTitleMaster.setText(txtTranslateHeader.getText());
    }
}

function selectFirstItem() {

    // Not for phone
    if (sap.ui.Device.system.phone) {
        return;
    }

    // Not when grouping is active
    if (MasterListToolbar.getVisible()) {
        return;
    }

    var items = MasterList.getItems();
    MasterList.removeSelections();

    if (items.length > 0) {
        MasterList.setSelectedItem(items[0]);
        MasterList.fireItemPress();
    }

}

function afterDataLoadedCache() {

    if (typeof modelMasterList.oData.length === 'undefined') {
        setTimeout(function() {
            sap.ui.core.BusyIndicator.show(0);
            getOnlineMasterList();
        }, 50);
    } else {
        setHeaderText();
        updateTileMenu();
        // selectFirstItem();
    }

}


function afterDataLoadedAjax() {

    pullUpdate.hide();
    jQuery.sap.require("sap.m.MessageToast");
    sap.m.MessageToast.show(txtTranslateUpdated.getText());

    setHeaderText();
    updateTileMenu();
    // selectFirstItem();

}

// Update Tile Counter in Menu
function updateTileMenu() {

    // if (typeof AppCache !== "undefined") { // Launchpad
    //     var rec = {};
    //     rec.APPLID = AppCache.CurrentApp;
    //     rec.TILE_VALUECOLOR = 'Good';
    //     rec.TILE_NUMBER = modelMasterList.oData.length;
    //     rec.TILE_UNIT = txtTranslateUnit.getText();

    //     if (sap.n) { // UXP 4
    //         sap.n.Launchpad.UpdateTileInfo(rec);
    //     } else {
    //         ModelData.Update(AppCacheMenuInfo, "APPLID", rec.APPLID, rec);
    //         setCacheAppCacheMenuInfo();
    //     }
    // }
}



