import earth from '../texture/earth.png';

export async function getEarthMat() {
    const texture = await matBuilder(earth);
    // 创建材质
    const material = new BABYLON.StandardMaterial('matEarth', spaceDocument.scene);
    material.diffuseTexture = texture;
    // 返回材质
    return material;
};

export async function getEarthPlaneMat() {
    // 地球赤道面材质
    const material = new BABYLON.StandardMaterial('matEarthPlane', spaceDocument.scene);
    material.diffuseColor = new BABYLON.Color3(0, 0, 1);
    material.alpha = 0.1;
    material.transparencyMode = BABYLON.Material.MATERIAL_ALPHABLEND;
    // 返回材质
    return material;
};

export async function getEarthOrbitPlaneMat() {
    // 地球公转黄道面材质
    const material = new BABYLON.StandardMaterial('matEarthOrbitPlane', spaceDocument.scene);
    material.diffuseColor = new BABYLON.Color3(1, 1, 0);
    material.alpha = 0.1;
    material.transparencyMode = BABYLON.Material.MATERIAL_ALPHABLEND;
    // 返回材质
    return material;
};

export async function matBuilder(image: any) {
    // 读取图片
    const bitmap = await createImageBitmap(new Blob([image], { type: 'image/png' }))
    // 创建画布
    const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
    const ctx = canvas.getContext('2d');
    // 绘制图片
    ctx.drawImage(bitmap, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    // 创建纹理
    const texture = new BABYLON.RawTexture(
        imageData.data,
        imageData.width,
        imageData.height,
        BABYLON.Engine.TEXTUREFORMAT_RGBA,
        spaceDocument.scene,
        false,
        false,
        BABYLON.Texture.TRILINEAR_SAMPLINGMODE
    );
    // 返回纹理
    return texture;
};

