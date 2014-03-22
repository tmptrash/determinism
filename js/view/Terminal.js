/**
 * Class of the UNIX-like terminal widget. Consists of text area and console-like
 * logic inside. It uses third-party library - Console.js for history, command
 * line emulation and for commands callbacks.
 *
 *  ------------------------
 * | user@localhost:~$      |
 * |                        |
 * |                        |
 * |                        |
 * |                        |
 * |                        |
 *  ------------------------
 *
 * @author DeadbraiN
 */
N13.define('App.view.Terminal', {
    extend  : 'App.Class',
    requires: [
        'App.help.Common',
        'App.help.String'
    ],
    configs : {
        /**
         * @required
         * {String} textarea tag id
         */
        id      : 'terminal',
        /**
         * {String} Name of the user in command line: user@host:~$
         */
        user    : 'user',
        /**
         * {String} Name of the host in command line string: user@host:~$
         */
        host    : 'localhost',
        /**
         * {Number} Terminal height in pixels
         */
        height  : 120,
        /**
         * {Array} Array of commands in format: [[command, cmdDescription],...]
         */
        commands: []
    },


    /**
     * @override
     * Checks and prepares configuration of the class.
     */
    checkConfig: function () {
        if (!N13.isString(this.id)) {
            console.error('Invalid id in configuration. Method: ' + this.className + '::' + App.help.Common.getCallerName());
        }
    },

    /**
     * Initializes private fields of the class. All private fields must be created here.
     * No matter if they will be initialized by null or special value.
     */
    initPrivates: function () {
        /**
         * {HTMLElement} Element of a text area for terminal.
         */
        this._textAreaEl = $('#' + this.id);
        /**
         * @readonly
         * {Console} Shortcut for the console class instance
         */
        this._console    = Console;
    },

    /**
     * @override
     * Main initializer of the class. You should use it for every kind of initializations
     * within class. For example logic initialization or creation of HTML nodes.
     */
    onInit: function () {
        //
        // Turn on terminal's auto scroll all the time
        //
        this._textAreaEl.on('keyup', this._onTerminalKeyUp.bind(this));
        //
        // Initializes third-party library, which emulates UNIX console.
        //
        this._console.init(this.id, this.user, this.host, this.bindCommands());
    },

    /**
     * Adds message to the console. It works in different way as WriteLine() or Write() methods.
     * It adds the message and after that, shows command (welcome) line in the console.
     * @param {String} msg Message to notify
     */
    message: function (msg) {
        this._console.WriteLine(msg);
        this._console.ShowUserLine();
    },

    /**
     * Set terminal to busy state. In this state user can not input the commands
     * @param {Boolean} busy true to disable terminal, false to enable
     */
    setBusy: function (busy) {
        this._textAreaEl.attr('disabled', busy);
        this._textAreaEl.eq(0).style.background = busy ? '#111111' : '#000';
        this._console.setBusy(busy);
    },

    /**
     * Prepares string. Replace '\\n' by '\n' and remove " symbol at the beginning and at
     * the end of string. It can be user for parameters truncate.
     * @param {String} s
     * @return {String} Prepared string
     */
    // TODO: i should check should i need it?
    prepareString: function (s) {
        if (s !== '""' && s.length > 2) {
            if (s[0] === '"' && s[s.length - 1] === '"') {
                s = s.substr(1, s.length - 2);
            }
            return s.replace('\\n', '\n');
        }

        return s;
    },

    /**
     * Creates one command in format: [cmd-name:String, cmd-function:Function, cmd-help-string:String].
     * Handler of the command you should declare manually. Example:
     * ...
     * createCmdHandler('ping', 'This is simple PING command');
     * ...
     * _onPingCmd: function () {...}
     * ...
     * @param {String} cmd Command Name
     * @param {String} help Command help string
     * @return {Array} Array of three items. See the format above.
     */
    createCmdHandler: function (cmd, help) {
        //
        // In case of invalid command arguments, we will create empty command with empty handler
        //
        if (!N13.isString(cmd) || cmd === '') {
            console.error('Invalid or empty command. This command will be skipped.', cmd);
            return null;
        }
        if (!N13.isString(help)) {
            console.info(App.help.String('Command {0} doesn\'t contain help string ot it is empty.', cmd));
            help = '';
        }

        return [
            cmd,
            this._createMethod('_on' + App.help.String.capitalize(cmd) + 'Cmd'),
            help
        ];
    },

    /**
     * Checks arguments of a parent caller and throw error in case of invalid one. It also calls
     * a validator with first argument if arguments array contains only one parameter otherwise with
     * all arguments.
     * @param {Number} argAmount Amount of required arguments
     * @param {String} cmd Name of the command
     * @param {Function|undefined} validator Optional validator function
     * @throw {Error}
     */
    // TODO: i should check should i need it?
    checkArguments: function (argAmount, cmd, validator) {
        var valid;
        var args = arguments.callee.caller.arguments[0].slice(1);

        //
        // null means, from 1 to any amount of arguments
        //
        if (argAmount === null && args.length < 1) {
            throw new Error('Invalid arguments amount. At least one argument is required. See \'help ' + cmd + '\' for details.');
        } else if (args.length < argAmount) {
            throw new Error('Invalid arguments amount. Use \'help ' + cmd + '\' for help.');
        }

        //
        // Validates arguments by custom validator
        //
        if (Lib.Helper.isFunction(validator)) {
            valid = validator(args.length === 1 ? args[0] : args);
            if (Lib.Helper.isString(valid)) {
                throw new Error(valid + ' Use \'help ' + cmd + '\' for help.');
            } else if (valid !== true) {
                throw new Error('Invalid arguments format. Use \'help ' + cmd + '\' for help.');
            }
        }
    },

    /**
     * Creates array of arrays with command and command handlers in format:
     * [[cmd:String, fn:Function, cmdHelp:String], ...]
     * You may override this method. But, in any case, it must return array of commands.
     * @return {Array} Array of two items arrays
     */
    bindCommands: function () {
        var me    = this;
        var cmds  = me.commands;
        var ret   = [];
        var isArr = N13.isArray;
        var i;
        var len;
        var cmd;

        for (i = 0, len = cmds.length; i < len; i++) {
            cmd = cmds[i];
            if (cmd.length > 1) {
                cmd = me.createCmdHandler.apply(me, cmd);
                if (isArr(cmd)) {
                    ret.push(cmd);
                }
            }
        }

        return ret;
    },


    /**
     * Creates wrapper around specified method in this class, so it will be run in this scope.
     * @param {String} method Name of method
     * @return {Function}
     * @private
     */
    _createMethod: function (method) {
        var me = this;

        return function (args) {
            var fn;

            try {
                fn = me[method];
                fn.call(me, args);
            } catch (e) {
                me._console.WriteLine(e.message);
            }
        };
    },

    /**
     * 'keyup' DOM event handler. Scrolls terminal text area at the bottom.
     * @param {jQuery.Event} e
     */
    _onTerminalKeyUp: function (e) {
        e.target.scrollTop = e.target.scrollHeight;
    }
});