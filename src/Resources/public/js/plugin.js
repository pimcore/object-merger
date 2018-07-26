/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - GNU General Public License version 3 (GPLv3)
 * - Pimcore Enterprise License (PEL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 *  @license    http://www.pimcore.org/license     GPLv3 and PEL
 */

pimcore.registerNS("pimcore.plugin.objectmerger");

pimcore.plugin.objectmerger = Class.create(pimcore.plugin.admin,{


    getClassName: function (){
        return "pimcore.plugin.objectmerger";
    },

    initialize: function(){
        pimcore.plugin.broker.registerPlugin(this);
    },

    uninstall: function(){

    },

    pimcoreReady: function (params,broker) {
        var extrasMenu = pimcore.globalmanager.get("layout_toolbar").extrasMenu;

        extrasMenu.add({
            text: t("plugin_objectmerger_compare"),
            iconCls: "plugin_objectmerger_icon",
            handler:  this.showObjectSelectionDialog.bind(this)

        });
    },


    showDiff: function(response) {
        var data = Ext.decode(response.responseText);

        if (data.success) {
            this.selectionDialog.close();
            pimcore.globalmanager.add("plugin_objectmerger", new pimcore.plugin.objectmerger.panel(data.oid1, data.oid2));
        } else {
            Ext.MessageBox.show({
                title:t('error'),
                msg: t('plugin_objectmerger_no_object'),
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });
        }
    },

    showObjectSelectionDialog: function() {

        this.selectionDialog = new Ext.Window({
            modal: false,
            autoHeight: true,
            title: t('plugin_objectmerger_compare'),
            closeAction: 'close',
            width: 700
        });


        this.textField1 = new Ext.form.TextField({
            emptyText: t("plugin_objectmerger_path"),
            width: 500
        });


        this.textField2 = new Ext.form.TextField({
            emptyText: t("plugin_objectmerger_path"),
            width: 500
        });


        var form = new Ext.form.FormPanel({
            bodyStyle: 'padding: 10px;',

            items: [
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    fieldLabel: t("plugin_objectmerger_object1"),
                    items: [
                        {
                            xtype: "button",
                            iconCls: "pimcore_icon_search",
                            handler: this.searchForObject.bind(this, 1)
                        }, this.textField1
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    fieldLabel: t("plugin_objectmerger_object2"),
                    items: [
                        {
                            xtype: "button",
                            iconCls: "pimcore_icon_search",
                            handler: this.searchForObject.bind(this, 2)
                        }, this.textField2
                    ]
                }
            ],

            bbar: [{
                xtype: "button",
                text: t("cancel"),
                iconCls: "pimcore_icon_cancel",
                handler: function () {
                    this.selectionDialog.close();
                }.bind(this)
            },{
                xtype: "button",
                text: t("plugin_objectmerger_btn_compare"),
                icon: "/bundles/pimcoreadmin/img/icon/tick.png",
                handler: function () {
                    Ext.Ajax.request({
                        url: "/admin/elementsobjectmerger/admin/getid",
                        method: "post",
                        params: {
                            path1: this.textField1.getValue(),
                            path2: this.textField2.getValue()
                        },
                        success: this.showDiff.bind(this)
                    });

                }.bind(this)
            }]
        });


        var afterRenderHandler = function(fieldPath, el){
            // add drop zone
            new Ext.dd.DropZone(el.getEl(), {
                reference: this,
                ddGroup: "element",
                getTargetFromEvent: function (e) {
                    return fieldPath.getEl();
                },

                onNodeOver: function (target, dd, e, data) {
                    var data = data.records[0].data;

                    if (data.elementType == "object" && data.type != "folder") {
                        return Ext.dd.DropZone.prototype.dropAllowed;
                    }

                    return Ext.dd.DropZone.prototype.dropNotAllowed;
                }.bind(this),

                onNodeDrop: function (target, dd, e, data) {
                    var data = data.records[0].data;

                    if (data.elementType == "object" && data.type != "folder") {
                        fieldPath.setValue(data.path);
                        return true;
                    }
                    return false;
                }.bind(this)
            });
        }.bind(this);

        this.textField1.on("render", afterRenderHandler.bind(this, this.textField1));
        this.textField2.on("render", afterRenderHandler.bind(this, this.textField2));

        this.selectionDialog.add(form);
        this.selectionDialog.show();
    },

    addDataFromSelector: function (objectIndex, item) {
        if (item) {
            this["textField" + objectIndex].setValue(item.fullpath);
        }
    },


    searchForObject: function(objectIndex) {
        pimcore.helpers.itemselector(false, this.addDataFromSelector.bind(this, objectIndex), {
            type: ["object"]
        });
    }
});

new pimcore.plugin.objectmerger();