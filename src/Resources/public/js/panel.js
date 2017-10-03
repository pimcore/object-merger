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

pimcore.registerNS("pimcore.plugin.objectmerger.panel");
pimcore.plugin.objectmerger.panel = Class.create({

    changeCount: 0,

    initialize: function (oid1, oid2) {
        this.id = oid1 + "_" + oid2;
        this.oid1 = oid1;
        this.oid2 = oid2;
        this.getTabPanel();
    },

    activate: function () {
        var tabPanel = Ext.getCmp("pimcore_panel_tabs");
        tabPanel.setActiveItem("pimcore_plugin_objectmerger_panel_" +  this.id);
    },


    save: function () {

        Ext.Ajax.request({
            url: "/admin/elementsobjectmerger/admin/save",
            method: "post",
            params: {
                id: this.oid2,
                sourceId: this.oid1,
                attributes: Ext.encode(this.resultData)
            },
            success: this.saveComplete.bind(this)
        });
    },

    toggle: function () {

        this.panel.close();
        new pimcore.plugin.objectmerger.panel(this.oid2, this.oid1);
    },

    getTabPanel: function () {

        if (!this.panel) {
            this.panel = new Ext.form.FormPanel({
                bodyCls: "diffpanel",
                layout: "fit",
                title: t("plugin_objectmerger_diff") + " " + this.oid1 + " - " + this.oid2,
                closable: true,
                items: [],
                buttons: [
                    {
                        text: t("plugin_objectmerger_mirror"),
                        iconCls: "plugin_objectmerger_icon_mirror",
                        handler: this.toggle.bind(this)
                    },
                    {
                        text: t("save"),
                        iconCls: "pimcore_icon_apply",
                        handler: this.save.bind(this)
                    }
                ],
                id: "pimcore_plugin_objectmerger_panel_" + this.id,
                iconCls: "plugin_objectmerger_icon"
            });

            var tabPanel = Ext.getCmp("pimcore_panel_tabs");
            tabPanel.add(this.panel);
            tabPanel.setActiveItem("pimcore_plugin_objectmerger_panel_" + this.id);

            this.panel.on("destroy", function () {
                pimcore.globalmanager.remove("plugin_objectmerger_" + this.id);
                var accordion = Ext.getCmp("pimcore_panel_tree_left");
                accordion.expand();
            }.bind(this));

            pimcore.layout.refresh();
        }

        Ext.Ajax.request({
            url: "/admin/elementsobjectmerger/admin/diff",
            method: "post",
            params: {
                id1: this.oid1,
                id2: this.oid2
            },
            success: this.showDiff.bind(this)
        });

        return this.panel;

    },

    prependStyle: function(html) {
        return html;
        // html = "<link rel=\"stylesheet\" type=\"text/css\" href=\"/plugins/ObjectMerger/static/css/preview.css\" />"
        var css = "<style type=\"text/css\">"
            + "tr {"
            + "background-color:#000000;"
            + "color:#E0E0E0"
            + "}"
            + " th {"
            + "background-color: #ccf;"
            + "color: #000;"
            + "font-size: x-small;"
            + "}"
            + "td {"
            + "border-right: 1px solid #C1DAD7;"
            + "border-bottom: 1px solid #C1DAD7;"
            + "background-color: #ccc;"
            + "color: #333;"
            + "font-size: x-small;"
            + "}"
            + "</style>";

        html = css + html;
        return html;
    },


    replaceImage: function(panel, src) {

        valuePreview = new Ext.Component({
            isFormField: true,
            autoEl: {
                id: Ext.id(),
                tag: 'img',
                src: src
            },
            isValid: function() {
                return true;
            },
            isDirty: function() {
                return false;
            }
        });

        panel.removeAll();
        panel.add(valuePreview);
        panel.updateLayout();
    },

    buildFromValue: function(value, type) {
        var valuePreview;
        if (type) {

            if (type == "img") {

                var theValue;
                if (value) {
                    theValue = value.src;
                }
                var parentPanel = new Ext.Panel({
                    width : 450,
                    height: 150,
                    border: true,
                    bodyCls: "diffpanel_preview"
                });
                this.replaceImage(parentPanel, theValue);

                valuePreview = parentPanel;
            } else if (type == "html") {
                var theValue;
                if (value) {
                    theValue = this.prependStyle(value.html);
                }
                // var valuePreview = new Ext.form.HtmlEditor({
                //     width : 450,
                //     enableLinks            : false,
                //     enableLists             : false,
                //     enableSourceEdit      : false,
                //     enableColors          : false,
                //     enableFontSize        : false,
                //     enableFormat          : false,
                //     enableAlignments      : false,
                //     enableFont            : false,
                //     hideLabel             : true,
                //     autoScroll              : false,
                //     value: theValue
                // });
                // valuePreview.setReadOnly(true);

                var valuePreview = new Ext.Panel({
                    width : 450,
                    // height: 150,
                    autoScroll: true,
                    border: true,
                    bodyCls: "diffpanel_preview",
                    html: theValue
                });

            } else {
                valuePreview = new Ext.form.TextField({
                    width: 450,
                    value: "Unsupported type",
                    disabled: true,
                    border: true,
                    fieldStyle: "border-color: #FFd0d0"
                });
            }
        } else {
            if (value == null || typeof value == "undefined") {
                value = "[undefined]";
            }
            valuePreview = new Ext.form.TextField({
                width: 450,
                value: value,
                disabled: true,
                fieldStyle: "border-color: #FFd0d0"
            });
        }

        return valuePreview;
    },

    panelActivated: function(language, thePanel) {
        thePanel.removeAll();

        var items = this.data.items;
        for (var i = -1; i < items.length; i++) {

            var item;
            if (i >= 0) {
                item = items[i];

                if (item.lang && item.lang != language) {
                    continue;
                }

                var style =  {};
                if (item.lang) {
                    style.fontWeight = "bold";
                }

                var statusStyle =  {};
                statusStyle.color = "orange";
                statusStyle.fontWeight = "bold";
            }


            var rightValue;
            var leftValue;

            var changed = false;

            if (item) {
                leftValue = item.value;

                if (this.resultData[item.key]) {
                    rightValue = this.resultData[item.key].value;
                    changed = this.resultData[item.key].changed;
                } else {
                    rightValue = item.value2;
                }

                var theType = null;
                if (item.value && item.value.type) {
                    theType = item.value.type;
                } else if (item.value2 && item.value2.type) {
                    theType = item.value2.type;
                }
                var statusText = "";
                if (item.isdiff && !changed) {
                    statusText = "!!!";
                }
                var niceName = item.title;

            } else {
                leftValue = this.data.o1path + " (id:" + this.data.o1id + ")";
                rightValue = this.data.o2path + " (id:" + this.data.o2id + ")";
            }

            var statusPanel = new Ext.form.Label({
                width : 16,
                border: false,
                style: statusStyle,
                text: statusText
            });


            var label = new Ext.form.Label({
                width: 250,
                text: niceName,
                style: style
            });


            //TODO optimize this, build a mapping table at loading time and reuse the values.
            var iconClass = null;
            var typeName = null;
            var isDisabled = true;
            var handler = null;

            if (item) {
                isDisabled = item.disabled;
                if (item.type) {
                    iconClass = this.executeFunctionByName("pimcore.object.classes.data." + item.type + ".prototype.getIconClass", window);
                    typeName = this.executeFunctionByName("pimcore.object.classes.data." + item.type + ".prototype.getTypeName", window);
                }
            } else {
                typeName = t("plugin_objectmerger_go");
                iconClass = "pimcore_icon_edit";
                handler = pimcore.helpers.openObject.bind(this, this.data.o1id, "object");
            }

            var datatype = new Ext.Button({
                iconCls: iconClass,
                disabled: (i >= 0),
                tooltip: typeName,
                handler: handler
            });

            var leftPreview = this.buildFromValue(leftValue, theType);
            var rightPreview = this.buildFromValue(rightValue, theType);

            var icon = null;
            var btnText = null;
            var hasHandler = false;

            if (item) {

                if (isDisabled) {
                    iconCls = "plugin_objectmerger_icon_lock";
                    btnText = t("plugin_objectmerger_copy_disabled");
                } else {
                    if (item.isdiff) {
                        hasHandler = true;
                        if (changed) {
                            iconCls = "plugin_objectmerger_icon_revert";
                            btnText = t("plugin_objectmerger_revert");
                        } else {
                            iconCls = "plugin_objectmerger_icon_arrow_right";
                            btnText = t("plugin_objectmerger_copy");
                        }
                    } else {
                        iconCls = "plugin_objectmerger_icon_gray_arrow";
                        btnText = t("plugin_objectmerger_equal");
                    }
                }
            } else {
                typeName = t("plugin_objectmerger_go");
                iconCls = "pimcore_icon_edit";
                isDisabled = false;
                btnText = t("plugin_objectmerger_go");
                hasHandler = true;
            }

            var applyButton = new Ext.Button({
                style: 'margin-left: 10px;',
                iconCls: iconCls,
                disabled: isDisabled,
                tooltip: btnText
            });

            if (hasHandler) {
                if (item && item.isdiff) {
                    applyButton.setHandler(this.applyData.bind(this, item, rightPreview, language, thePanel, statusPanel, applyButton));
                } else {
                    applyButton.setHandler(pimcore.helpers.openObject.bind(this, this.data.o2id, "object"));
                }
            }

            applyButton.apply = true;

            var style;
            if (i < 0) {
                style = 'margin-bottom: 30px;';
            }

            var fieldSet = new Ext.form.FieldContainer({
                layout: 'hbox',
                border: false,
                labelWidth: 0,
                disabled: isDisabled,
                style: style,
                items: [
                    statusPanel,
                    label,
                    datatype,
                    leftPreview,
                    applyButton,
                    rightPreview
                ]
            });

            thePanel.add(fieldSet);
        }
        thePanel.updateLayout();

    },

    getTabForLanguage: function (language) {

        var title = language.name;

        var formForLanguage = new Ext.Panel({
            title: title,
            iconCls: "pimcore_icon_language_" + language.key.toLowerCase(),
            bodyStyle: "padding:10px;",
            autoScroll: true,
            border:false,
            x_nicename: title,
            x_key: language.key,
            x_diffCount: 0
        });

        formForLanguage.on("activate", this.panelActivated.bind(this, language.key));

        return formForLanguage;
    },

    executeFunctionByName: function(functionName, context /*, args */) {
        var args = Array.prototype.slice.call(arguments, 2);
        var namespaces = functionName.split(".");
        var func = namespaces.pop();
        for (var i = 0; i < namespaces.length; i++) {
            context = context[namespaces[i]];
        }
        return context[func].apply(context, args);
    },

    updateTitle: function() {
        var title = t("plugin_objectmerger_diff") + " " + this.data.o1key + "-" + this.data.o2key;
        if (this.changeCount) {
            title = title + " *";
        }
        this.panel.setTitle(title);
    },

    showDiff: function(response) {
        var accordion = Ext.getCmp("pimcore_panel_tree_left");
        accordion.collapse();

        var data = Ext.decode(response.responseText);
        var id = Ext.id();

        this.data = data;
        var items = data.items;

        this.updateTitle();

        var languages = data.languages;

        this.tab = new Ext.TabPanel({
            items: []
        });


        this.tabmap = {};

        for (var i = 0; i < languages.length; i++) {
            var lang = languages[i];
            var tabForLanguage = this.getTabForLanguage(lang);
            tabForLanguage.diffCount = 0;
            this.tabmap[lang.key] = tabForLanguage;
            this.tab.add(tabForLanguage);
        }

        this.resultData = {};

        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            this.resultData[item.key] = {
                value : item.value2,
                data  : item.data2,
                field : item.field,
                key   : item.key,
                extData: item.extData,
                lang: item.lang,
                changed: false
            };

            if (item.isdiff) {
                if (item.lang) {
                    // get tab for language
                    var tab = this.tabmap[item.lang];
                    tab.x_diffCount++;
                } else {
                    for (var tab in this.tabmap) {
                        this.tabmap[tab].x_diffCount++;
                    }
                }
            }
        }

        for (var tab in this.tabmap) {
            var title = this.tabmap[tab].x_nicename;
            var diffCount = this.tabmap[tab].x_diffCount;
            if (diffCount > 0) {
                title = title + " (" + diffCount + ")";
                this.tabmap[tab].setTitle(title);
            }
        }

        this.panel.add(this.tab);
        this.tab.setActiveTab(0);
        this.panel.updateLayout();
    },

    changeData: function(apply, item, rightPreview, language, tabPanel, statusPanel, applyButton) {
        var theValue;
        var theData;
        var changed;
        var diff;
        var apply = applyButton.apply;
        if (apply) {
            theValue = item.value;
            theData = item.data;
            changed = true;
            iconCls = "plugin_objectmerger_icon_revert";
            btnText = t("plugin_objectmerger_revert");
            diff = -1;
            this.changeCount++;
        } else {
            theValue = item.value2;
            theData = item.data2;
            changed = false;
            iconCls = "plugin_objectmerger_icon_arrow_right";
            btnText = t("plugin_objectmerger_copy");
            diff = 1;
            this.changeCount--;
        }

        if (this.changeCount < 2) {
            this.updateTitle();
        }

        // update the tab title
        if (item.lang) {
            // only applies to this tab
            var title = this.tabmap[item.lang].x_nicename;
            this.tabmap[item.lang].x_diffCount += diff;
            if (this.tabmap[item.lang].x_diffCount > 0) {
                title = title + " (" + this.tabmap[item.lang].x_diffCount + ")";
            }
            this.tabmap[item.lang].setTitle(title);
        } else {
            for (var tab in this.tabmap) {
                var title = this.tabmap[tab].x_nicename;
                this.tabmap[tab].x_diffCount += diff;
                if (this.tabmap[tab].x_diffCount > 0) {
                    title = title + " (" + this.tabmap[tab].x_diffCount + ")";
                }
                this.tabmap[tab].setTitle(title);
            }
        }

        applyButton.apply = !applyButton.apply;
        applyButton.setIconCls(iconCls);
        applyButton.setTooltip(btnText);

        this.resultData[item.key] = {
            value : theValue,
            data  : theData,
            field : item.field,
            key   : item.key,
            extData: item.extData,
            lang: item.lang,
            isdiff: item.isdiff,
            changed: changed
        }

        if (apply) {

            if (item.isdiff) {
                statusPanel.setText("");
            } else {
                statusPanel.setText("!!!");
            }
        } else {
            statusPanel.setText("!!!");
        }

        var rightPreviewClassName = Ext.getClassName(rightPreview);
        console.log(Ext.getClassName(rightPreview));
        if (theValue && theValue.type) {
            if (theValue.type == "img") {
                this.replaceImage(rightPreview, theValue.src);
            } else if (theValue.type == "html") {
                rightPreview.setHtml(
                    this.prependStyle(theValue.html)
                );
            } else {
                this.panelActivated(language, tabPanel);
            }
        } else {
            var value = theValue;
            if (typeof value == "undefined") {
                value = "[undefined]";
            }

            if (rightPreviewClassName == "Ext.panel.Panel") {
                rightPreview.removeAll();
            } else {
                rightPreview.setValue(value);
            }
        }
    },


    revertData: function(item, rightPreview, language, tabPanel, statusPanel, applyButton) {
        this.changeData(false, item, rightPreview, language, tabPanel, statusPanel, applyButton);

    },

    applyData: function(item, rightPreview, language, tabPanel, statusPanel, applyButton) {
        this.changeData(true, item, rightPreview, language, tabPanel, statusPanel, applyButton);

    },

    saveComplete: function(response) {
        var data = Ext.decode(response.responseText);
        if (data.success) {
            pimcore.plugin.broker.fireEvent("pluginObjectMergerPostMerge", data);
            pimcore.helpers.showNotification(t("success"), t("your_object_has_been_saved"), "success");
        } else {
            pimcore.helpers.showNotification(t("error"), t(data.message), "error");
        }
    }
});

