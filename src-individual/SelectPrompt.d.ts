/**
 * See {SelectPrompt} documentation for usage.
 *
 */
declare class SelectPromptItem {
	/**
	 * Unique identifier for the item. No two items in the same SelectPrompt should have the same ID.
	 */
	id: string
	
	/**
	 * The text to explain the item. Should be descriptive, user-facing value.
	 */
	title: string
	
	/**
	 * Optional subtitle text to display smaller below the title. Useful if options require greater levels of explanation to assist the selecting the correct option.
	 */
	subtitle?: string
	
	/**
	 * The name of a valid SF Symbol available on the platform. It will be displayed as a small icon next to the item title, if provided. Valid symbol names can be found using Apple's [SF Symbols app](https://developer.apple.com/sf-symbols/) or other third party tools and [online references](https://github.com/andrewtavis/sf-symbols-online).
	 * @category Display
	 */
	symbolName?: string
} 

/**
 * Select prompt allow the creation and display of custom dialogs which prompt the user to select from a list of options. The prompt is searchable to filter the list, and keyboard navigable. This is a great option if you need to make a selection from a long list of items.
 * 
 * @example
 * 
 * ```javascript
 * let p = new SelectPrompt()
 * p.message = "Select from the options below" // optional
 * 
 * p.addItem("id1", "First Item", "Optional subtitle")
 * p.addItem("id2", "Second Item", "Optional subtitle")
 * p.addItem("id3", "Third Item", "Optional subtitle")
 * 
 * // if `show` returns false, user hit
 * // cancel button
 * if (p.show()) {
 *   let selectedID = p.selectedItem.id
 *   // do something with your selection
 * }
 * ```
 *
 */
declare class SelectPrompt {
	/**
	 * An optional explanatory message to display at the top of the prompt
	 * @category Display
	 */
	message?: string

	/**
	 * Add an information text label to the prompt. Returns true if item successfully added. If item cannot be added, check action log of details of the error, typically it is because of issues like a duplicate `id` value, or missing parameters.
	 * @param id Identifier. Should be unique to the items in the prompt.
	 * @param title User-facing description.
	 * @param subtitle Optional additional explanatory text.
	 * @param symbolName Optional SF Symbol name to display as an icon.
	 * @category Items
	 */
	addItem(
		id: string,
		title: string,
		subtitle?: string,
		symbolName?: string
	): boolean

	/**
	 * After the `show()` method is called, this property will contain the item the user selected in the prompt. If the user cancelled without making a selection, it will be null.
	 * @category Result
	 */
	selectedItem?: SelectPromptItem

	/**
	 * Displays the prompt. Returns `true` if the user selected one of the item, `false` if cancelled without making a selection.
	 */
	show(): boolean

	/**
	 * Create new instance.
	 */
	static create(): Prompt

	/**
	 * Create new instance.
	 */
	constructor()
}
