console.clear();
function parseSpiceDate(str) { return new Date(Date.parse(str.replace(',', '').replace(' at', '').replace(/([0-9][0-9]?)(st|nd|rd|th)/, '$1'))) }

function jsonifySpiceTickets(index, activityEvent) {
    activityEvent = $(activityEvent);
    let activityItem = $(activityEvent.find('.activity-item'));
    let activityHeader = $(activityItem.find('.activity-header'));
    
    // Determine type of event
    var type;
    if(activityEvent.hasClass('create')) {
        type = 'CREATE';
    } else if(activityEvent.hasClass('labor')) {
        type = 'LABOR';
    } else if(activityEvent.hasClass('change')) {
        type = "CHANGE:" + activityHeader.find('strong')[1].textContent.trim().toUpperCase();
    } else if(activityEvent.hasClass('note')) {
        type = 'NOTE';
    } else if(activityEvent.hasClass('comment')) {
        type = 'RESPONSE';
    } else {
        console.log('Unable to determine type:', activityEvent);
        return;
    }

    // format the different fields depending on the type of event
    var body = null, beforeAfter = [], dt;
    if(type=='LABOR') {
        dt = activityHeader.find('.print-show').text().trim();
        
        body = activityHeader.find('em').text().trim();
        beforeAfter.push(activityHeader[0].childNodes[3].nodeValue.trim());
    } else if(type.startsWith('CHANGE:')) {
        dt = activityHeader.find('.print-show').text().trim();
        
        let ems = activityHeader.find('em');
        beforeAfter.push(ems[0].textContent.trim());
        if(ems.length==2)
            beforeAfter.push(ems[1].textContent.trim());
        else
            beforeAfter.unshift(null);
    } else if(type=='RESPONSE' || type=='NOTE' || type=='CREATE') {
        dt = activityItem.find('.meta .print-show').text().trim();
        
        body = activityItem.find('.body').text().trim();
    }
    
    // do some checks & transformations after values are determined
    if(body!=null && body.length==0)
        body = null;
    try {
        dt = parseSpiceDate(dt)
    } catch(e) {
        console.log('Error parsing date', dt);
        return null;
    }
    
    // get that JSON, son!
    var json = {
        type: type,
        creator: activityHeader.find('.activity-creator').text().trim(),
        timestamp: dt,
        body: body,
        change: beforeAfter
    };
    
    return json;
}


function exportSpiceTickets() {
    let ticketNum = $('.ticket-header span')[0].textContent.replace('#','');
    let result = {};
    result[ticketNum] = $('.activity-event').map(jsonifySpiceTickets).toArray().reverse();
    return JSON.stringify(result, null, 2);
}

//exportSpiceTickets()

$('.activity-event').map(jsonifySpiceTickets).toArray()


/*
TODO: Attachments
*/