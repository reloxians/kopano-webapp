Ext.namespace('Zarafa.common.recipientfield.ui');

/**
 * @class Zarafa.common.recipientfield.ui.RecipientContextMenu
 * @extends Zarafa.core.ui.menu.ConditionalMenu
 * @xtype zarafa.recipientcontextmenu
 */
Zarafa.common.recipientfield.ui.RecipientContextMenu = Ext.extend(Zarafa.core.ui.menu.ConditionalMenu, {
	// Insertion points for this class
	/**
	 * @insert context.common.recipientfield.contextmenu.actions
	 * @param {Zarafa.common.recipientfield.ui.RecipientContextMenu} contextmenu This contextmenu
	 */

	/**
	 * @cfg {Boolean} editable
	 * False to prevent any menu item to edit the record on which this menu is shown.
	 */
	editable : true,

	/**
	 * @constructor
	 * @param {Object} config Configuration object
	 */
	constructor : function(config)
	{
		config = config || {};

		var editable = Ext.isDefined(config.editable) ? config.editable : this.editable;
		var resolved = false;
		if (config.records) {
			if (Array.isArray(config.records)) {
				config.records = config.records[0];
			}

			resolved = config.records.isResolved();
		}

		Ext.applyIf(config, {
			items: [{
				xtype: 'zarafa.conditionalitem',
				text: _('Edit Recipient'),
				iconCls : 'icon_edit_recipient',
				hidden : !editable || resolved,
				handler: this.editRecipient,
				scope: this
			},{
				xtype: 'zarafa.conditionalitem',
				text: _('Show Details'),
				iconCls : 'icon_contact',
				hidden : !resolved,
				handler: this.openDetailsContent,
				scope: this
			},{
				xtype: 'zarafa.conditionalitem',
				text: _('Copy email address'),
				iconCls : 'icon_copy',
				hidden : !resolved,
				handler: this.copyEmail,
				scope: this
			},{
				xtype: 'zarafa.conditionalitem',
				text: _('Send email'),
				iconCls : 'icon_new_email',
				handler: this.onEmailRecipient,
				scope: this
			},
				container.populateInsertionPoint('context.common.recipientfield.contextmenu.actions', this),
			{
				xtype: 'menuseparator'
			}]
		});

		Zarafa.common.recipientfield.ui.RecipientContextMenu.superclass.constructor.call(this, config);
	},

	/**
	 * Handler for the "Edit Recipient" option. This will open the edit contentpanel.
	 *
	 * @private
	 */
	editRecipient : function()
	{
		Zarafa.core.data.UIFactory.openCreateRecord(this.records, {
			manager : Ext.WindowMgr
		});
	},

	/**
	 * Handler for the "Show Details" option. This will convert
	 * the {@link Zarafa.core.dat.IPMRecipientRecord recipient}
	 * into a {@link Zarafa.core.data.MAPIRecord addressbook record}
	 * which can be opened in the Addressbook details content panel.
	 *
	 * @private
	 */
	openDetailsContent : function()
	{
		Zarafa.common.Actions.openViewRecipientContent(this.records);
	},

	/**
	 * Handler for the "Copy email address" option. This will
	 * copy email address of the resolved recipient.
	 */
	copyEmail : function ()
	{
		Zarafa.common.Actions.copyEmailAddress(this.records);
	},

	/**
	 * Handler for the "Email Recipient" option. This will create
	 * a new {@link Zarafa.core.data.MAPIRecord mail record}
	 * and generate new phantom recipient for new mail. Then
	 * it will open a new MailCreate ContentPanel for the new mail
	 *
	 * @private
	 */
	onEmailRecipient : function()
	{
		Zarafa.common.Actions.onEmailRecipient(this.records);
	}
});

Ext.reg('zarafa.recipientcontextmenu', Zarafa.common.recipientfield.ui.RecipientContextMenu);
