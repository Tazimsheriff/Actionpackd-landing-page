import os
import sys
import bpy

blend_path = 't:/actionpackd/assets/uploads_files_4252681_RED+BULL+2022+F1+CAR.blend'
export_path = 't:/actionpackd/assets/f1_car_redbull_full.glb'

print(f"Opening blend file: {blend_path}")
bpy.ops.wm.open_mainfile(filepath=blend_path)

# Pack all external textures into the blend file first
try:
    bpy.ops.file.pack_all()
    print("Packed all textures successfully.")
except Exception as e:
    print(f"Pack notice: {e}")

# Export full GLB with packed textures
print(f"Exporting full GLB to: {export_path}")
bpy.ops.export_scene.gltf(
    filepath=export_path,
    export_format='GLB',
    export_materials='EXPORT',
    export_image_format='AUTO',
    export_colors=True,
    export_attributes=True,
    export_texcoords=True,
    export_normals=True,
    export_cameras=False,
    export_lights=False
)

print(f"Export finished! Result size: {os.path.getsize(export_path)} bytes")
