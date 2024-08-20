import LightningDatatable from 'lightning/datatable';
import customNameTemplate from './customName.html';
import customNumberTemplate from './customNumber.html';
import progressBarTemplate from './progressBar.html';
import avatarTemplate from './avatar.html';
import mapTemplate from './map.html';
import badge from "./badge.html";

export default class CustomDataTable extends LightningDatatable {
    static customTypes = {
        customName: {
            template: customNameTemplate,
            standardCellLayout: true,
            typeAttributes: ['accountName'],
        },
        customNumber: {
            template: customNumberTemplate,
            standardCellLayout: true,
            typeAttributes: [],
        },
        progressBar: {
            template: progressBarTemplate,
            standardCellLayout: true,
            typeAttributes: [],
        },
        avatar: {
            template: avatarTemplate,
            standardCellLayout: false,
            typeAttributes: ['source'],
        },
        map: {
            template: mapTemplate,
            standardCellLayout: true,
            typeAttributes: ['mapMarkers', 'mapOptions'],
        },
        badge: {
            template: badge,
            typeAttributes: ['value']
        }
    }
}