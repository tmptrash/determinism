/**
 * The most basic class interface
 *
 * @author DeadbraiN
 */
N13.define('App.Class', {
    /**
     * @interface
     * Is used for configuration checking
     */
    checkConfig: N13.emptyFn,

    /**
     * @interface
     * Calls first, before any initialization will be started.
     * Is used for pre initialization logic.
     */
    beforeInit: N13.emptyFn,

    /**
     * @interface
     * Creates and initializes all private fields in current class.
     */
    initPrivates: N13.emptyFn,

    /**
     * @interface
     * Creates and initializes all public fields in current class.
     */
    initPublics: N13.emptyFn,

    /**
     * Main initialization method. Is used for main init logic.
     */
    onInit: N13.emptyFn,

    /**
     * @interface
     * Calls after all initialization logic. Is used for
     * post initializtion logic.
     */
    afterInit: N13.emptyFn,

    /**
     * @constructor
     * Calls all initialization methods
     */
    init: function () {
        this.checkConfig();
        this.beforeInit();
        this.initPrivates();
        this.initPublics();
        this.onInit();
        this.afterInit();
    }
});