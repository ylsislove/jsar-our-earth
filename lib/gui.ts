import { ctrlPanelListener } from './main';

const whiteBg = spaceDocument.getMaterialById('whiteBg') as BABYLON.StandardMaterial;
whiteBg.alpha = 0;
whiteBg.transparencyMode = BABYLON.Material.MATERIAL_ALPHABLEND;

const scene = spaceDocument.scene as BABYLON.Scene;
const sun = spaceDocument.getNodeById('sun') as BABYLON.Mesh;
const earth = spaceDocument.getNodeById('earth') as BABYLON.Mesh;

function clg(params:any) {
    console.log('ylsislove', params);
}

setOrbitTextStyle('springText')
setOrbitTextStyle('summerText')
setOrbitTextStyle('autumnText')
setOrbitTextStyle('winterText')
function setOrbitTextStyle(id: string) {
    const autumnText = spaceDocument.getSpatialObjectById(id);
    const autumnTextRoot = autumnText.shadowRoot;
    const autumnTextRootChildren = autumnTextRoot.querySelectorAll('.sub');
    for (let sub of autumnTextRootChildren) {
        const subElement = sub as HTMLElement;
        subElement.style.height = '200px';
        subElement.style.width = '100%';
        subElement.style.fontSize = '80px';
        subElement.style.color = '#ffffff';
        subElement.style.textAlign = 'center';
    }
}

const ctrlPanel = spaceDocument.getSpatialObjectById('ctrlPanel');
const ctrlPanelRoot = ctrlPanel.shadowRoot;
const ctrlPanelRootChildren = ctrlPanelRoot.querySelectorAll('.sub');
for (let sub of ctrlPanelRootChildren) {
    const subElement = sub as HTMLElement;
    subElement.style.backgroundColor = '#ffffff0f';
    subElement.style.height = '200px';
    subElement.style.width = '90%';
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
spaceDocument.watchInputEvent();



