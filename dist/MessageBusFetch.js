"use strict";

var _MessageBus = require("./MessageBus");
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const MessageBusFetch = _ref => {
  let {
    workflow,
    datasource,
    requestMapping,
    responseMapping,
    requestData,
    submitEvent,
    handleResponse
  } = _ref;
  const submitEventName = submitEvent || 'SUBMIT';
  _MessageBus.MessageBus.send('WF.'.concat(workflow).concat('.INIT'), {
    header: {
      registrationId: workflow,
      workflow,
      eventType: 'INIT'
    }
  });
  _MessageBus.MessageBus.subscribe(workflow, 'WF.'.concat(workflow).concat('.STATE.CHANGE'), handleResponse(), {});
  _MessageBus.MessageBus.send('WF.'.concat(workflow).concat('.').concat(submitEventName), {
    header: {
      registrationId: workflow,
      workflow,
      eventType: submitEventName
    },
    body: {
      datasource: datasources[datasource],
      request: requestData,
      requestMapping,
      responseMapping
    }
  });
};

/** href And also accepts all the Button props */
MessageBusFetch.propTypes = {
  /** Name of the workflow */
  workflow: _propTypes.default.string,
  /** datasource for making api call */
  datasource: _propTypes.default.string,
  /** How the request needs to be mapped */
  requestMapping: _propTypes.default.string,
  /** How the response needs to be mapped  */
  responseMapping: _propTypes.default.string,
  /** Contains request body and params */
  requestData: _propTypes.default.object,
  /** Submit event  */
  submitEvent: _propTypes.default.string,
  /** Callback response from the messagebus */
  handleResponse: _propTypes.default.func
};