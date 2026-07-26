import os
import base64

input_file = 't:/actionpackd/assets/f1_car_compressed.glb'
output_js = 't:/actionpackd/assets/redbull_model_data.js'

with open(input_file, 'rb') as f:
    data = f.read()

b64_str = base64.b64encode(data).decode('utf-8')
data_uri = f'data:model/gltf-binary;base64,{b64_str}'

with open(output_js, 'w') as f:
    f.write(f'window.REDBULL_3D_MODEL_DATA = "{data_uri}";\n')

print(f'Successfully generated embedded 3D model JS file: {output_js} ({os.path.getsize(output_js)} bytes)')
