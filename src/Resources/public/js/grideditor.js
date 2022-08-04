/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - GNU General Public License version 3 (GPLv3)
 * - Pimcore Commercial License (PCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 *  @license    http://www.pimcore.org/license     GPLv3 and PCL
 */


pimcore.registerNS("pimcore.plugin.objectmerger.grideditor");
pimcore.plugin.objectmerger.grideditor = Class.create({

    changeCount: 0,

    initialize: function (item, currentData, callback) {
        this.item = item;
        this.currentData = currentData;
        this.callback = callback;
    },

    show: function () {
        var fields = ["__source", "__title", "__selected", "__raw", "__gridrow", "__unique"];

        var typesColumns = [];
        typesColumns.push({text: t('source'), sortable: true, dataIndex: '__source'});
        // typesColumns.push({text: t('selected'), sortable: true, dataIndex: '__selected'});
        // typesColumns.push({text: t('unique'), sortable: true, dataIndex: '__unique'});

        var data = [];

        var added = false;

        var existingStuff = {};


        var sourceData = this.currentData.data;
        if (sourceData) {
            var j;
            for (j = 0; j < sourceData.length; j++) {
                var rowItem = sourceData[j];
                var rawRaw = rowItem["raw"];
                var itemId = rowItem["itemId"];
                var gridrow = rowItem["gridrow"];

                var raw = Ext.decode(rawRaw);

                if (!added) {

                    added = true;
                    for (var key in gridrow) {
                        if (gridrow.hasOwnProperty(key)) {


                            var initialConfig = typeof this.item.value.columnConfig[key] !== "undefined" ? Ext.apply({}, this.item.value.columnConfig[key]) : {};
                            if (initialConfig.text) {
                                initialConfig.text = t(initialConfig.text);
                            }

                            if (!initialConfig.width && !initialConfig.flex) {
                                initialConfig.flex = 1;
                            }

                            var dataIndex = key == "id" ? "__id" : key;

                            fields.push(dataIndex);

                            var config = Ext.applyIf(initialConfig, {
                                text: t(key),
                                sortable: true,
                                dataIndex: dataIndex
                            });
                            typesColumns.push(config);
                        }
                    }
                }

                if (existingStuff[itemId]) {
                    continue;
                }

                existingStuff[itemId] = true;

                var rowData = raw;

                if (rowData['id']) {
                    rowData['__id'] = rowData['id'];
                    delete rowData['id'];
                }
                rowData['__source'] = t(rowItem["__source"]);
                rowData['__selected'] = rowItem["__selected"];
                rowData['__title'] = rowItem["title"];
                rowData['__raw'] = rawRaw;
                rowData['__gridrow'] = gridrow;
                rowData['__itemId'] = itemId;
                rowData['__unique'] = rowItem["unique"];

                data.push(rowData);
            }
        }

        typesColumns.push({
            xtype: 'actioncolumn',
            menuText: t('up'),
            width: 40,
            items: [
                {
                    tooltip: t('up'),
                    icon: "/bundles/pimcoreadmin/img/flat-color-icons/up.svg",
                    handler: function (grid, rowIndex) {
                        if (rowIndex > 0) {
                            var store = grid.getStore();
                            var rec = store.getAt(rowIndex);
                            var isSelected = this.selectionColumn.isSelected(rec);
                            store.removeAt(rowIndex);
                            store.insert(--rowIndex, [rec]);
                            if (isSelected) {
                                this.selectionColumn.select(rec, true);
                            }
                        }
                    }.bind(this)
                }
            ]
        });

        typesColumns.push({
            xtype: 'actioncolumn',
            menuText: t('down'),
            width: 40,
            items: [
                {
                    tooltip: t('down'),
                    icon: "/bundles/pimcoreadmin/img/flat-color-icons/down.svg",
                    handler: function (grid, rowIndex) {
                        if (rowIndex < (grid.getStore().getCount() - 1)) {
                            var store = grid.getStore();
                            var rec = store.getAt(rowIndex);
                            var isSelected = this.selectionColumn.isSelected(rec);
                            store.removeAt(rowIndex);
                            store.insert(++rowIndex, [rec]);
                            if (isSelected) {
                                this.selectionColumn.select(rec, true);
                            }
                        }
                    }.bind(this)
                }
            ]
        });

        this.store = new Ext.data.ArrayStore({
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json'
                }
            },
            autoDestroy: true,
            data: data,
            fields: fields
        });

        this.selectionColumn = new Ext.selection.CheckboxModel({
            checkOnly: true,
            listeners: {
                select: function(selModel, selectedRecord) {
                    var uniqueId = selectedRecord.get("__unique");
                    if (!uniqueId) {
                        return;
                    }

                    var selection = selModel.getSelection();
                    var i;
                    for (i = 0; i < selection.length; i++) {
                        var otherRecord = selection[i];
                        var otherUniqueId = otherRecord.get("__unique");
                        if (otherUniqueId == uniqueId) {
                            if (selectedRecord.getId() != otherRecord.getId()) {
                                selModel.deselect(otherRecord);
                            }
                        }

                    }
                }.bind(this)
            }
        });

        this.grid = new Ext.grid.GridPanel({
            frame: false,
            autoScroll: true,
            store: this.store,
            columnLines: true,
            stripeRows: true,
            selModel: this.selectionColumn,
            columns: typesColumns,
            viewConfig: {
                // plugins: [
                //     {
                //         ptype: 'gridviewdragdrop',
                //         dragroup: 'objectclassselect'
                //     }
                // ],
                forceFit: true,
                listeners: {
                    drop: function () {
                        var selModel = this.grid.getSelectionModel();
                        selModel.select(this.selectedRecords);
                    }.bind(this)

                }
            }
        });

        this.selectedRecords = [];
        this.store.each(function (rec) {

            if (rec.get('__selected')) {
                this.selectedRecords.push(rec);
            }
        }.bind(this));

        var selModel = this.grid.getSelectionModel();
        selModel.select(this.selectedRecords);

        this.editWin = new Ext.Window({
            modal: false,
            title: t("edit") + " " + this.item.key,
            items: [this.grid],
            bodyStyle: "background: #fff;",
            width: 1000,
            maxHeight: 800,
            autoScroll: true,
            listeners: {
                close: function () {

                }.bind(this)
            },
            buttons: [
                {
                    text: t("save"),
                    iconCls: 'pimcore_icon_save',
                    handler: function () {
                        var result = [];
                        this.store.each(function (rec) {
                            var isSelected = this.selectionColumn.isSelected(rec);

                            var raw = rec.get('__raw');
                            var source = rec.get('__source');
                            var title = rec.get('__title');
                            var gridrow = rec.get('__gridrow');
                            var itemId = rec.get('__itemId');
                            var unique = rec.get('__unique');

                            var resultItem = {
                                "__selected": isSelected,
                                "__source": source,
                                "itemId": itemId,
                                "title": title,
                                "raw": raw,
                                "gridrow": gridrow,
                                "unique": unique
                            };

                            result.push(resultItem);

                        }.bind(this));


                        this.callback(result);

                        this.editWin.close();
                    }.bind(this)
                },
                {
                    text: t("cancel"),
                    iconCls: 'pimcore_icon_cancel',
                    handler: function () {
                        this.editWin.close();
                    }.bind(this)
                }
            ]
        });
        this.editWin.show();
        this.editWin.updateLayout();
    }
});

