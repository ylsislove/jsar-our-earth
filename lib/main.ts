import { ctrlPanelListener } from './gameManager';

const whiteBg = spaceDocument.getMaterialById('whiteBg') as BABYLON.StandardMaterial;
whiteBg.alpha = 0;
whiteBg.transparencyMode = BABYLON.Material.MATERIAL_ALPHABLEND;

const scene = spaceDocument.scene as BABYLON.Scene;
const sun = spaceDocument.getNodeById('sun') as BABYLON.Mesh;
const earth = spaceDocument.getNodeById('earth') as BABYLON.Mesh;

function clg(params:any) {
    console.log('ylsislove', params);
}

function setOrbitTextStyleTextCenter(id: string) {
    const autumnText = spaceDocument.getSpatialObjectById(id);
    const autumnTextRoot = autumnText.shadowRoot;
    const autumnTextRootChildren = autumnTextRoot.querySelectorAll('.sub');
    for (let sub of autumnTextRootChildren) {
        const subElement = sub as HTMLElement;
        subElement.style.height = '400px';
        subElement.style.width = '100%';
        subElement.style.fontSize = '160px';
        subElement.style.color = '#ffffff';
        subElement.style.textAlign = 'center';
    }
}
function setOrbitTextStyleTextRight(id: string) {
    const autumnText = spaceDocument.getSpatialObjectById(id);
    const autumnTextRoot = autumnText.shadowRoot;
    const autumnTextRootChildren = autumnTextRoot.querySelectorAll('.sub');
    for (let sub of autumnTextRootChildren) {
        const subElement = sub as HTMLElement;
        subElement.style.height = '400px';
        subElement.style.width = '100%';
        subElement.style.fontSize = '160px';
        subElement.style.color = '#ffffff';
        subElement.style.textAlign = 'right';
    }
}
function setOrbitTextStyleTextLeft(id: string) {
    const autumnText = spaceDocument.getSpatialObjectById(id);
    const autumnTextRoot = autumnText.shadowRoot;
    const autumnTextRootChildren = autumnTextRoot.querySelectorAll('.sub');
    for (let sub of autumnTextRootChildren) {
        const subElement = sub as HTMLElement;
        subElement.style.height = '400px';
        subElement.style.width = '100%';
        subElement.style.fontSize = '160px';
        subElement.style.color = '#ffffff';
        subElement.style.textAlign = 'left';
    }
}
setOrbitTextStyleTextCenter('springText')
setOrbitTextStyleTextRight('summerText')
setOrbitTextStyleTextCenter('autumnText')
setOrbitTextStyleTextLeft('winterText')

function setGeneralTextStyle(id: string) {
    const autumnText = spaceDocument.getSpatialObjectById(id);
    const autumnTextRoot = autumnText.shadowRoot;
    const autumnTextRootChildren = autumnTextRoot.querySelectorAll('.sub');
    for (let sub of autumnTextRootChildren) {
        const subElement = sub as HTMLElement;
        subElement.style.height = '100%';
        subElement.style.width = '100%';
        subElement.style.fontSize = '300px';
        subElement.style.color = '#ffffff';
        subElement.style.textAlign = 'center';
    }
}
setGeneralTextStyle('radLineText')
setGeneralTextStyle('arcticText')
setGeneralTextStyle('antarcicText')
setGeneralTextStyle('earthAxisText')

function setGeneralTextStyle2(id: string) {
    const autumnText = spaceDocument.getSpatialObjectById(id);
    const autumnTextRoot = autumnText.shadowRoot;
    const titleTextRootChildren = autumnTextRoot.querySelectorAll('.title');
    for (let sub of titleTextRootChildren) {
        const subElement = sub as HTMLElement;
        subElement.style.height = '25%';
        subElement.style.width = '100%';
        subElement.style.fontSize = '100px';
        subElement.style.color = '#ffffff';
        subElement.style.textAlign = 'center';
    }

    const contentTextRootChildren = autumnTextRoot.querySelectorAll('.content');
    for (let sub of contentTextRootChildren) {
        const subElement = sub as HTMLElement;
        subElement.style.height = '70%';
        subElement.style.width = '100%';
        subElement.style.fontSize = '50px';
        subElement.style.color = '#ffffff';
        subElement.style.textAlign = 'justify';
        subElement.style.border = '1px solid white';
        subElement.style.borderRadius = '5px';
        subElement.addEventListener('mouseup', () => {
            ctrlPanelListener("start");
        });
    }
}
setGeneralTextStyle2('startText')

const ctrlPanel = spaceDocument.getSpatialObjectById('ctrlPanel');
const ctrlPanelRoot = ctrlPanel.shadowRoot;
const ctrlPanelRootChildren = ctrlPanelRoot.querySelectorAll('.sub');
for (let sub of ctrlPanelRootChildren) {
    const subElement = sub as HTMLElement;
    subElement.style.backgroundColor = '#ffffff0f';
    subElement.style.height = '200px';
    subElement.style.width = '80%';
    subElement.style.fontSize = '80px';
    subElement.style.color = '#fff';
    subElement.style.textAlign = 'center';
    subElement.style.border = '1px solid white';
    subElement.style.borderRadius = '50px';

      /** Listen events */
    subElement.addEventListener('mouseenter', () => {
        subElement.style.backgroundColor = 'rgba(20,33,33,.95)';
    });
    subElement.addEventListener('mouseleave', () => {
        subElement.style.backgroundColor = '#ffffff0f';
    });
    subElement.addEventListener('mouseup', () => {
        subElement.style.backgroundColor = 'rgba(60,33,33,.95)';
        ctrlPanelListener(subElement.textContent);
    });
}
