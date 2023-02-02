import { MessageBus } from './MessageBus';
import PropTypes from 'prop-types';

const MessageBusFetch = ({
    workflow,
    datasource,
    requestMapping,
    responseMapping,
    requestData,
    submitEvent,
    handleResponse,
}) => {
    const submitEventName = submitEvent || 'SUBMIT';
    MessageBus.send('WF.'.concat(workflow).concat('.INIT'), {
        header: {
            registrationId: workflow,
            workflow,
            eventType: 'INIT',
        },
    });
    MessageBus.subscribe(
        workflow,
        'WF.'.concat(workflow).concat('.STATE.CHANGE'),
        handleResponse(),
        {}
    );
    MessageBus.send(
        'WF.'.concat(workflow).concat('.').concat(submitEventName),
        {
            header: {
                registrationId: workflow,
                workflow,
                eventType: submitEventName,
            },
            body: {
                datasource: datasources[datasource],
                request: requestData,
                requestMapping,
                responseMapping,
            },
        }
    );
};

/** href And also accepts all the Button props */
MessageBusFetch.propTypes = {
    /** Name of the workflow */
    workflow: PropTypes.string,
    /** datasource for making api call */
    datasource: PropTypes.string,
    /** How the request needs to be mapped */
    requestMapping: PropTypes.string,
    /** How the response needs to be mapped  */
    responseMapping: PropTypes.string,
    /** Contains request body and params */
    requestData: PropTypes.object,
    /** Submit event  */
    submitEvent: PropTypes.string,
    /** Callback response from the messagebus */
    handleResponse: PropTypes.func,
};
