from ultralytics import YOLO
import matplotlib.pyplot as plt
import cv2
from sort import *
import numpy as np
from inference_sdk import InferenceHTTPClient
import cv2
from matplotlib import pyplot as plt
import tempfile
import os


def getgoal(path, filename):

    def convert_xywh_to_xyxy(x_center, y_center, width, height):
        """
        Convert bounding box coordinates from [x_center, y_center, width, height]
        to [x_min, y_min, x_max, y_max].
        """
        x_min = x_center - width // 2
        y_min = y_center - height // 2
        x_max = x_center + width // 2
        y_max = y_center + height // 2
        return np.array([[x_min, y_min, x_max, y_max]])
    
    def calculate_coverage_score(smaller_box, larger_box):
        """
        Calculate the coverage score indicating how much a smaller bounding box is covered by a larger bounding box.
    
        Parameters:
        - smaller_box: Tuple or list containing (x1, y1, x2, y2) coordinates of the smaller bounding box.
        - larger_box: Tuple or list containing (x1, y1, x2, y2) coordinates of the larger bounding box.
    
        Returns:
        - coverage_score: Float representing the coverage score indicating how much the smaller box is covered by the larger box.
        """
        x1_small, y1_small, x2_small, y2_small = smaller_box
        x1_large, y1_large, x2_large, y2_large = larger_box
    
        # Calculate intersection coordinates
        x1_inter = max(x1_small, x1_large)
        y1_inter = max(y1_small, y1_large)
        x2_inter = min(x2_small, x2_large)
        y2_inter = min(y2_small, y2_large)
    
        # Calculate intersection area
        intersection_area = max(0, x2_inter - x1_inter + 1) * max(0, y2_inter - y1_inter + 1)
    
        # Calculate area of smaller box
        smaller_box_area = (x2_small - x1_small + 1) * (y2_small - y1_small + 1)
    
        # Calculate coverage score
        coverage_score = intersection_area / smaller_box_area
    
        return coverage_score
        
    def calculate_iou(box1, box2):
        """
        Calculate the Intersection over Union (IoU) of two bounding boxes.
    
        Parameters:
        - box1: Tuple or list containing (x1, y1, x2, y2) coordinates of the first bounding box.
        - box2: Tuple or list containing (x1, y1, x2, y2) coordinates of the second bounding box.
    
        Returns:
        - iou: Float representing the IoU between the two bounding boxes.
        """
        # Get coordinates of intersection rectangle
        x1_inter = max(box1[0], box2[0])
        y1_inter = max(box1[1], box2[1])
        x2_inter = min(box1[2], box2[2])
        y2_inter = min(box1[3], box2[3])
    
        # Calculate area of intersection rectangle
        intersection_area = max(0, x2_inter - x1_inter + 1) * max(0, y2_inter - y1_inter + 1)
    
        # Calculate area of both bounding boxes
        box1_area = (box1[2] - box1[0] + 1) * (box1[3] - box1[1] + 1)
        box2_area = (box2[2] - box2[0] + 1) * (box2[3] - box2[1] + 1)
    
        # Calculate IoU
        iou = intersection_area / float(box1_area + box2_area - intersection_area)
    
        return iou
        
        
        
    humtrack=Sort()
    
    
    # Path to the input video file
    video_path = path +filename
    
    # Open the video file
    cap = cv2.VideoCapture(video_path)
    
    # Check if the video opened successfully
    if not cap.isOpened():
        print("Error: Couldn't open the video file.")
        exit()
    
    # Create a temporary directory to store the frames
    temp_dir = tempfile.mkdtemp()
    file_paths=[]
    # Loop through each frame of the video
    frame_count = 0
    while True:
        # Read a frame from the video
        ret, frame = cap.read()
    
        # Check if the frame was successfully read
        if not ret:
            break  # Break the loop if end of the video is reached
    
        # Save the frame as a temporary image file
        temp_img_path = os.path.join(temp_dir, f"frame_{frame_count}.jpg")
        cv2.imwrite(temp_img_path, frame)
        file_paths.append(temp_img_path)
        # Display the frame inline in Jupyter Notebook
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    
    
        # Press any key to display the next frame
        #cv2.waitKey(1)
    
        frame_count += 1
    
    # Release the video capture object
    cap.release()
    print('loaded')
    # Run model inference
    # people identification model
    CLIENT = InferenceHTTPClient(
        api_url="https://detect.roboflow.com",
        api_key="pz84iLP8D9ldGqXW2tfc"
    )
    
    resulthuman = CLIENT.infer(file_paths, model_id="person-detection-9a6mk/16")
    print('model run')
    # basketball and rim model
    
    CLIENT = InferenceHTTPClient(
        api_url="https://detect.roboflow.com",
        api_key="pz84iLP8D9ldGqXW2tfc"
    )
    
    result = CLIENT.infer(file_paths, model_id="basketball-lhqoe/1")
    print('basketball')
    
    '''
    for result in results:
        boxes = result.boxes  # Boxes object for bounding box outputs
        masks = result.masks  # Masks object for segmentation masks outputs
        keypoints = result.keypoints  # Keypoints object for pose outputs
        probs = result.probs  # Probs object for classification outputs
        result.show() 
        '''
    savedatahuman=np.empty((0,6))
    savedatarim=np.empty((0,5))
    savedataball=np.empty((0,5))
    
    humthres=0.8
    for i in range(len(resulthuman)):
        bb=np.empty((0,4))
        for j in range(len(resulthuman[i]['predictions'])):
            bb=np.append(bb,convert_xywh_to_xyxy(resulthuman[i]['predictions'][j]['x'],resulthuman[i]['predictions'][j]['y'],
                                                    resulthuman[i]['predictions'][j]['width'],resulthuman[i]['predictions'][j]['height']), axis=0)
        if len(bb) >=2:
            bb=bb[:2]
            
        conf=[]
        for j in range(len(bb)):
            conf.append(resulthuman[i]['predictions'][j]['confidence'])
        conf=np.reshape(np.array(conf),(-1,1))
    
        frame=np.reshape(np.array([i+1 for j in range(len(bb))]),(-1,1))
        #indices = np.where(conf[:, 0] >= humthres)
        #bb = bb[indices]
        #print(mot_track.update(bb))
        #print('bb:', bb)
    
        tracks=humtrack.update(bb)
        
        frame=np.reshape(np.array([i+1 for j in range(len(tracks))]),(-1,1))
        #print('frame:',frame)
        savedatahuman=np.append(savedatahuman,np.concatenate([frame, tracks],axis=1), axis=0)
    
    
    
        for j in range(len(result[i]['predictions'])):
            numballs=0
            numrim=0
            if result[i]['predictions'][j]['class'] == 'Basketball' and numrim==0: 
                # actually rim due to issues annotating
                bb=np.empty((0,4))
                
                bb=np.append(bb,convert_xywh_to_xyxy(result[i]['predictions'][j]['x'],result[i]['predictions'][j]['y'],
                                                            result[i]['predictions'][j]['width'],result[i]['predictions'][j]['height']), axis=0)
                
              
                conf=[]
                conf.append(result[i]['predictions'][j]['confidence'])
                conf=np.reshape(np.array(conf),(-1,1))
            
                frame=np.reshape(np.array([i+1 for j in range(len(bb))]),(-1,1))
                #indices = np.where(conf[:, 0] >= humthres)
                #bb = bb[indices]
                #print(mot_track.update(bb))
                #print('bb:', bb)
            
                #tracks=humtrack.update(bb)
                
                frame=np.reshape(np.array([i+1 for j in range(len(bb))]),(-1,1))
                #print('frame:',frame)
                savedatarim=np.append(savedatarim,np.concatenate([frame, bb],axis=1), axis=0)
                numrim+=1
                
            elif result[i]['predictions'][j]['class']=='Basketball Hoop' and numballs==0:
                bb=np.empty((0,4))
                
                bb=np.append(bb,convert_xywh_to_xyxy(result[i]['predictions'][j]['x'],result[i]['predictions'][j]['y'],
                                                            result[i]['predictions'][j]['width'],result[i]['predictions'][j]['height']), axis=0)
                
              
                conf=[]
                conf.append(result[i]['predictions'][j]['confidence'])
                conf=np.reshape(np.array(conf),(-1,1))
            
                frame=np.reshape(np.array([i+1 for j in range(len(bb))]),(-1,1))
                #indices = np.where(conf[:, 0] >= humthres)
                #bb = bb[indices]
                #print(mot_track.update(bb))
                #print('bb:', bb)
            
                #tracks=humtrack.update(bb)
                
                frame=np.reshape(np.array([i+1 for j in range(len(bb))]),(-1,1))
                #print('frame:',frame)
                savedataball=np.append(savedataball,np.concatenate([frame, bb],axis=1), axis=0)
                numrim+=1
                numballs+=1
        '''
        bb=np.array(basketballresult.boxes.xyxy.cpu())
        conf=np.reshape(np.array(basketballresult.boxes.conf.cpu()),(-1,1))
        frame=np.reshape(np.array([i+1 for j in range(len(bb))]),(-1,1))
        #print(mot_track.update(bb))
        #print('bb:', bb)
        tracks=basketballtrack.update(bb)
    
        frame=np.reshape(np.array([i+1 for j in range(len(tracks))]),(-1,1))
        #print('frame:',frame)
        savedatabasketball=np.append(savedatabasketball,np.concatenate([frame, tracks],axis=1), axis=0)
        #print(mot_track.update(bb))
    
        
        bb=np.array(rimresult.boxes.xyxy.cpu())
        conf=np.reshape(np.array(rimresult.boxes.conf.cpu()),(-1,1))
        frame=np.reshape(np.array([i+1 for j in range(len(bb))]),(-1,1))
        #print(mot_track.update(bb))
        #print('bb:', bb)
        tracks=rimtrack.update(bb)
    
        frame=np.reshape(np.array([i+1 for j in range(len(tracks))]),(-1,1))
        #print('frame:',frame)
        savedatarim=np.append(savedatarim,np.concatenate([frame, tracks],axis=1), axis=0)
    np.savetxt('human.txt',savedatahuman, delimiter=',', fmt='%d')
    np.savetxt('basketball.txt',savedatabasketball, delimiter=',', fmt='%d')
    np.savetxt('rim.txt',savedatarim, delimiter=',', fmt='%d')
    
    
    
    
    # Remove the temporary directory and its contents
    import shutil
    shutil.rmtree(temp_dir)
    '''
    
    # loop through each frame
    # identify how close basketball is to hoop and people
    # save for each frame state of basketball 0- nothing 1- in posession of person1 2- in possesion of person2 3- score
    # locate hoop
    #most_frequent= np.argmax(np.bincount(savedatarim[:, -1].astype(int)))
    information=[]
    rim=savedatarim[2][1:]
    goal=0
    pwb=0
    for i in range(frame_count):
        frame=i+1
        # is there a basketball in frame?
        index=np.where(savedataball[:,0]==frame)[0]
        if len(index) > 0:
            basketball=savedataball[index[0]][1:]
        # find people inf frame
        indices=np.where(savedatahuman[:,0]==frame)[0]
        if len(indices) >0:
            people=savedatahuman[indices][:,1:]
    
        # is goal scored?
       
        if len(index)>0 and len(indices) >0:
            if np.abs(basketball[2]-rim[0]) <200 and np.abs(basketball[1]-rim[3]) < 100 and goal==0:
                print(frame,'hi')
                goal=1
                information.append((frame/30, pwb))
            if calculate_iou(basketball, rim) >.0:
                print(frame, 'goal scored')
                
            # who has the ball?
            else:
                for j in range(len(people)):
                    if calculate_coverage_score(basketball, people[j][:-1]) > 0.8:
                        goal=0
                        print(frame,f'person {people[j][-1]}, {j} has ball')
                        pwb=j
                    
    
    '''
    
        
        # are there people in frame?
        indices=np.where(savedatahuman[:,0]==frame)[0]
        if len(indices) >=1:
            people=savedatahuman[indices]
    
        # is a goal scored?
        if calculate_iou(basketball,rim) > .8:
            print('goal')
        else:
            for j in range(len(people)):
                if calculate_coverage_score(basketball,people[j][1:-1]) > .8:
                    print(j, 'has ball')
                    '''
                    
    np.savetxt('goaltimes.json',information)
    np.savetxt('rim.json',rim)
    
