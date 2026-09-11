type modelSessionMode = 'onDevice' | 'pcc' | 'claudeSonnet' | 'claudeOpus' | 'gptLuna' | 'gptTerra' | 'gptSol'
type toolSet = 'drafts' | 'editor' | 'reminders' | 'events' | 'history' | 'files'
/**
 * Create generable schema to provide to {@link ModelSession} objects to get back structured, non-string responses.
 * For more examples, see these sample actions:
 *
 * - [Move to Reminders](https://directory.getdrafts.com/a/273): Parses reminders out of selected lines and creates them. Demostrates using multiple `respond` calls on the same session.
 *
 * @example
 *
 * **Getting Structured Responses**
 *
 * ```javascript
 * // CREATE A PROMPT TO SEND TO MODEL
 * const prompt = `Generate tag suggestions to use classifying the  * text below:
 *
 * ${draft.content}`
 *
 * // CREATE MODEL OBJECT
 * let m = new ModelSession()
 * // CREATE SCHEMA TO GET BACK STRUCTURED DATA
 * let schema = ModelSessionSchema.create("Tag Suggestions", "A set of tag suggestions to classify a text.")
 * schema.addStringArray("tags", "A list of tags to assign the text")
 * // QUERY THE MODEL
 * let response = m.respond(prompt, schema)
 * ```
 */
declare class ModelSessionSchema {
	/**
	 * Add a string type property
	 * @param name Human-readable name for property. This will translate to a key for the value in returned object.
	 * @param description Details on the usage and meaning of the property to guide the model in creation of results.
	 * @category Values
	*/
	addString(name: string, description: string): void

	/**
	 * Add a string type property
	 * @param name Human-readable name for property. This will translate to a key for the value in returned object.
	 * @param description Details on the usage and meaning of the property to guide the model in creation of results.
	 * @category Values
	*/
	addString(name: string, description: string): void

	/**
	 * Add a boolean type property
	 * @param name Human-readable name for property. This will translate to a key for the value in returned object.
	 * @param description Details on the usage and meaning of the property to guide the model in creation of results.
	 * @category Values
	*/
	addBoolean(name: string, description: string): void

	/**
	 * Add an integer type property
	 * @param name Human-readable name for property. This will translate to a key for the value in returned object.
	 * @param description Details on the usage and meaning of the property to guide the model in creation of results.
	 * @category Values
	*/
	addInt(name: string, description: string): void

	/**
	 * Add a number type property
	 * @param name Human-readable name for property. This will translate to a key for the value in returned object.
	 * @param description Details on the usage and meaning of the property to guide the model in creation of results.
	 * @category Values
	*/
	addNumber(name: string, description: string): void

	/**
	 * Add an array of strings type properties
	 * @param name Human-readable name for property. This will translate to a key for the value in returned object.
	 * @param description Details on the usage and meaning of the property to guide the model in creation of results.
	 * @category Values
	*/
	addStringArray(name: string, description: string): void

	/**
	 * Add an array of boolean type properties
	 * @param name Human-readable name for property. This will translate to a key for the value in returned object.
	 * @param description Details on the usage and meaning of the property to guide the model in creation of results.
	 * @category Values
	*/
	addBooleanArray(name: string, description: string): void

	/**
	 * Add an array of integer type properties
	 * @param name Human-readable name for property. This will translate to a key for the value in returned object.
	 * @param description Details on the usage and meaning of the property to guide the model in creation of results.
	 * @category Values
	*/
	addIntArray(name: string, description: string): void

	/**
	 * Add an array of number type properties
	 * @param name Human-readable name for property. This will translate to a key for the value in returned object.
	 * @param description Details on the usage and meaning of the property to guide the model in creation of results.
	 * @category Values
	*/
	addNumberArray(name: string, description: string): void

	/**
	 * Create new instance
	 * @param name Human-readable name for property
	 * @param description Detail regarding the use of the property
	 * @category Constructor
	 */
	static create(name: string, description: string): ModelSessionSchema

	/**
	 * Create new instance.
	 * @param name Human-readable name for property
	 * @param description Detail regarding the use of the property
	 * @category Constructor
	 */
	constructor(name: string, description: string)
}


/**
 * Prompt the on-device ModelSession, part of the [Foundation Models API](https://developer.apple.com/documentation/foundationmodels?changes=_10_5) introduced in iOS/macOS 27. Requires OS 27 and a device that supports (and has enabled) Apple Intelligence.
 * 
 * The `ModelSession` object allows working with both on-device and Private Cloud Compute LLM Models, as well as Claude Sonnet and Opus models.
 * 
 * For example actions and more details on selection of model modes, [see User Guide](https://docs.getdrafts.com/docs/actions/ai)
 * 
 * > **NOTE:** Each instance of `ModelSession` operates as a session, so repeated calls to `respond` will maintain the context of previous calls – and are cumulatively subject to the token limits.
 * 
 * @example
 * 
 * **Prompting the On-Device LLM**
 * 
 * ```javascript
 * // create a prompt based on the content of the current draft
 * let prompt = draft.processTemplate("[[draft]]")
 * 
 * // create model instance and submit prompt
 * let lm = new ModelSession()
 * lm.mode = "onDevice" // or "pcc" for Private Cloud Compute
 * 
 * let response = lm.respond(prompt)
 * 
 * if (!response) { // handle failure
 * 	  alert(lm.lastError)
 * 	  context.fail()
 * }
 * else { // update draft to include response
 * 	  editor.setText(`${prompt}
 * 
 * ===
 * 
 * ${response}`)
 * }
 * ```
 */
declare class ModelSession {
	/**
	 * Get a response from the on-device language model.
	 * @param prompt Text prompt to submit to the model.
	 * @param schema Optional schema object to get responses in a structured format. If schema is not passed, responses will be in string format.
	*/
	respond(prompt: string, schema?: ModelSessionSchema): object
	
	/**
	 * Model mode. Controls active model for the session. Default: `onDevice`
	 * @category Configuration
	*/
	mode: modelSessionMode
	
	/**
	 * Array of text instructions to include in session to guide prompt evaluation.
	 * @category Configuration
	*/
	instructions: string[]

	/**
	 * Value between 0.0 and 1.0 indicating the temperature to assign the session. Higher values allow the model to be more creative, but less predictable in generating responses.
	 * @category Configuration
	*/
	temperature: number
	
	/**
	 * Add text instruction for the model to the instructions array.
	 * @category Configuration
	*/
	addInstruction(instruction: string): null
	
	/**
	 * Check availability of ModelSession a model session mode on the current device. Allows graceful fall back on devices that do not support Foundation Models, or are running older OS versions.
	 * @category Modes
	*/
	static isAvailable(mode: modelSessionMode): boolean
	
	/**
	 * List all available modes on the device.
	 * @category Modes
	*/
	static availableModes(): modelSessionMode[]
	
	/**
	 * Check whether ModelSession, as configured, is available for use on the current device. Allows graceful fall back on devices that do not support Foundation Models, or are running older OS versions.
	 * @category Modes
	*/
	isAvailable: boolean
	
	/**
	 * Enable or disable tools sets to extend functionality of the model. Only enable tool sets you expect to use, as additional ones impact your token usage. 
	 
	 Default: ["drafts", "editor"]
	 @category Configuration
	*/
	toolSets: toolSet[]
	
	/**
	 * Activate a tool set for the session.
	 * @category Configuration
	*/
	addToolSet(toolSet: toolSet): null
	
	/**
	 * A reasoning level supported by the current model in use for the session. The on-device model does not support levels, `pcc` mode, for example, supports "light", "moderate", and "deep"
	 @category Configuration
	*/
	reasoningLevel: string

	/**
	 * A JSON formatted output of the session's current transcript of prompts and responses. Can be useful in troubleshooting.
	*/
	transcript: string

	/**
	 * If a previous function returned an error, the error description will be available in this property
	 */
	lastError?: string

	/**
	 * Create new instance
	 * @category Constructor
	 */
	static create(mode?: string): ModelSession

	/**
	 * Create new instance.
	 * @category Constructor
	 */
	constructor()
}
