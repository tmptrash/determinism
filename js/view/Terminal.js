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
        'App.help.String',
        'App.help.Ui'
    ],
    configs : {
        /**
         * @required
         * {String} text area tag query
         */
        element  : '#terminal',
        /**
         * {String} Name of the user in command line: user@host:~$
         */
        user     : 'user',
        /**
         * {String} Name of the host in command line string: user@host:~$
         */
        host     : 'localhost',
        /**
         * {Array} Array of commands in format: [[command, cmdDescription],...]
         */
        commands : [],
        /**
         * {String} Color of the busy terminal. Should be in format: "#XXXXXX"
         */
        busyColor: '#111111',
        /**
         * {String} Format of the command handler method. e.g.: _onListCmd() for command "list"
         */
        cmdFormat: '_on{0}Cmd'
    },


    /**
     * Is used for class state checking
     */
    beforeInit: function () {
        this.checkField('element',   String, $('textarea').eq(0));
        this.checkField('user',      String, this.configs.user);
        this.checkField('host',      String, this.configs.host);
        this.checkField('commands',  Array,  this.configs.commands);
        this.checkField('busyColor', String, this.configs.busyColor);
        this.checkField('cmdFormat', String, this.configs.cmdFormat);

        if (!Console) {
            console.error(App.help.String.format('Required library "{0}" not found in class "{1}".', Console.name, this.className));
        }
        if (!$(this.element).length) {
            console.error('Required config element wasn\'t set or appropriate tag doesn\'t exist.');
            this.element = 'textarea:first';
        }
    },

    /**
     * Initializes private fields of the class. All private fields must be created here.
     * No matter if they will be initialized by null or special value.
     */
    initPrivates: function () {
        this.checkField('element',  String, $('textarea').eq(0));

        /**
         * {HTMLElement} Element of a text area for terminal.
         */
        this._textAreaEl = $(this.element);
        /**
         * @readonly
         * {Console} Shortcut for the console class instance
         */
        this._console    = Console;
        /**
         * {String} Default background color
         */
        this._defColor   = App.help.Ui.rgb2hex(this._textAreaEl.css('background-color'));
    },

    /**
     * @override
     * Main initializer of the class. You should use it for every kind of initializations
     * within class. For example logic initialization or creation of HTML nodes.
     */
    onInit: function () {
        this.checkField('user', String, this.configs.user);
        this.checkField('host', String, this.configs.host);

        this._updateId();
        //
        // Initializes third-party library, which emulates UNIX console.
        //
        this._console.init(this._textAreaEl.attr('id'), this.user, this.host, this.bindCommands());
    },

    /**
     * Calls after all initialization is done. Is used for events binding.
     */
    afterInit: function () {
        //
        // Turn on terminal's auto scroll all the time
        //
        this._textAreaEl.on('keyup', this._onKeyUp.bind(this));
    },

    /**
     * Adds message to the console. It works in different way as WriteLine() or Write() methods.
     * It adds the message and after that, shows command (welcome) line in the console.
     * @param {String} msg Message to notify
     */
    message: function (msg) {
        msg = this.checkValue(msg, String, '');

        this._console.WriteLine(msg);
        this._console.ShowUserLine();
    },

    /**
     * Set terminal to busy state. In this state user can not input the commands
     * @param {Boolean} busy true to disable terminal, false to enable
     */
    setBusy: function (busy) {
        busy = this.checkValue(busy, Boolean, !this._textAreaEl.attr('disabled'));
        this.checkField('busyColor', String, this.configs.busyColor);
        
        this._textAreaEl.attr('disabled', busy);
        this._textAreaEl.css('background-color', busy ? this.busyColor : this._defColor);
        this._console.setBusy(busy);
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
        var str = App.help.String;

        cmd  = this.checkValue(cmd, String, null);
        help = this.checkValue(help, String, '');
        this.checkField('cmdFormat', String, this.configs.cmdFormat);

        if (!cmd) {
            return null;
        }

        return [
            cmd,
            this._createMethod(str.format(str.capitalize(cmd), this.cmdFormat)),
            help
        ];
    },

    /**
     * Creates array of arrays with command and command handlers in format:
     * [[cmd:String, fn:Function, cmdHelp:String], ...]
     * You may override this method. But, in any case, it must return array of commands.
     * @return {Array} Array of two items arrays
     */
    bindCommands: function () {
        this.checkField('commands', Array, this.configs.commands);

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
                cmd = me.createCmdHandler(cmd);
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
    _onKeyUp: function (e) {
        e.target.scrollTop = e.target.scrollHeight;
    },

    /**
     * Updates id attribute of the textarea tag if doesn't exist
     */
    _updateId: function () {
        //
        // if textarea tag doesn't contain id, we should set it
        //
        if (!this._textAreaEl.attr('id')) {
            this._textAreaEl.attr('id', this.getId());
        }
    }
});