'use strict'

/**
 * Module dependencies.
 */

const AsyncOption = require('../abstract/AsyncOption')

/**
 * clientDynamicModules option.
 */

module.exports = class ClientDynamicModulesOption extends AsyncOption {
  async apply (ctx) {
    await super.asyncApply()

    for (const { value, name: pluginName } of this.appliedItems) {
      const { name, content, dirname = 'dynamic' } = value
      await ctx.writeTemp(
        `${dirname}/${name}`,
        `
/**
 * Generated by "${pluginName}"
 */
${content}\n\n
        `.trim())
    }
  }
}
