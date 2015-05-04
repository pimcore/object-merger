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

        if (extrasMenu) {
            extrasMenu.add({
                text: t("plugin_objectmerger_compare"),
                iconCls: "plugin_objectmerger_icon",
                handler:  this.showObjectSelectionDialog.bind(this)

            });
        }
    },


    showDiff: function(response) {
        var data = Ext.decode(response.responseText);

        if (data.success) {
            this.selectionDialog.close();
            pimcore.globalmanager.add("plugin_objectmerger", new pimcore.plugin.objectmerger.panel("Object_Abstract::getById", data.oid1, "Object_Abstract::getById", data.oid2));
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
            autoHeight: true,
            title: t('plugin_objectmerger_compare'),
            closeAction: 'close',
            width: 500,
            modal: true
        });


        this.textField1 = new Ext.form.TextField({
            emptyText: t("plugin_objectmerger_path"),
            width: 300
        });


        this.textField2 = new Ext.form.TextField({
            emptyText: t("plugin_objectmerger_path"),
            width: 300
        });


        var form = new Ext.form.FormPanel({
            bodyStyle: 'padding: 10px;',

            items: [
                {
                    xtype: 'compositefield',
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
                    xtype: 'compositefield',
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
                icon: "/pimcore/static/img/icon/cancel.png",
                handler: function () {
                    this.selectionDialog.close();
                }
            },{
                xtype: "button",
                text: t("plugin_objectmerger_btn_compare"),
                icon: "/pimcore/static/img/icon/tick.png",
                handler: function () {
                    Ext.Ajax.request({
                        url: "/plugin/ObjectMerger/admin/getid",
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