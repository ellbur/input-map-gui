
const codeToCharMap = {
    36: 'h',
    33: 'u',  
};

function codeToDisplay(code) {
    const c = codeToCharMap[code];
    if (c) {
        return c;
    }
    else {
        return code;
    }
}

$(document).ready(() => {
    const mainTable = $('#main-table');
    const closedLabel = $('#closed-label');
    
    const socket = new WebSocket('ws://localhost:8080');
    
    socket.addEventListener('message', ev => {
        const j = JSON.parse(ev.data);
        if (j['type'] == 'in') {
            const d = j['data'];
            const tr = $('<tr>');
            const tdType = $('<td class="in-type">')
            tdType.text(d['type']);
            tr.append(tdType);
            const tdCode = $('<td class="in-code">')
            tdCode.text(codeToDisplay(d['code']));
            tr.append(tdCode);
            const tdValue = $('<td class="in-value">')
            tdValue.text(d['value']);
            tr.append(tdValue);
            tr.append($('<td>'));
            tr.append($('<td>'));
            tr.append($('<td>'));
            tr.append($('<td>'));
            mainTable.append(tr);
            tr[0].scrollIntoView();
        }
        else if (j['type'] == 'loop-end') {
            const d = j['data'];
            const tr = $('<tr class="loop-end">');
            const td = $('<td class="loop-end" colspan="100">')
            tr.append(td);
            mainTable.append(tr);
            tr[0].scrollIntoView();
        }
        else if (j['type'] == 'in-action') {
            const d = j['data'];
            const tr = $('<tr>');
            const tdValue = $('<td class="in-action-code">')
            tdValue.text(codeToDisplay(d['code']));
            
            tr.append($('<td>'));
            tr.append($('<td>'));
            tr.append($('<td>'));
            
            if (d['value'] == 1) {
                tdValue.addClass('in-press-code');
                tr.append(tdValue);
                tr.append($('<td>'));
            }
            else {
                tdValue.addClass('in-release-code');
                tr.append($('<td>'));
                tr.append(tdValue);
            }
            
            tr.append($('<td>'));
            tr.append($('<td>'));
                
            mainTable.append(tr);
            tr[0].scrollIntoView();
        }
        else if (j['type'] == 'out-press') {
            const d = j['data'];
            const tr = $('<tr>');
            const tdValue = $('<td class="out-press-code out-code">')
            tdValue.text(codeToDisplay(d['code']));
            
            tr.append($('<td>'));
            tr.append($('<td>'));
            tr.append($('<td>'));
            
            tr.append($('<td>'));
            tr.append($('<td>'));
            
            tr.append(tdValue);
            tr.append($('<td>'));
            
            mainTable.append(tr);
            tr[0].scrollIntoView();
        }
        else if (j['type'] == 'out-release') {
            const d = j['data'];
            const tr = $('<tr>');
            const tdValue = $('<td class="out-release-code out-code">')
            tdValue.text(codeToDisplay(d['code']));
            
            tr.append($('<td>'));
            tr.append($('<td>'));
            tr.append($('<td>'));
            
            tr.append($('<td>'));
            tr.append($('<td>'));
            
            tr.append($('<td>'));
            tr.append(tdValue);
            
            mainTable.append(tr);
            tr[0].scrollIntoView();
        }
    });
    
    socket.addEventListener('close', ev => {
        closedLabel.text('Closed');
    });
})

