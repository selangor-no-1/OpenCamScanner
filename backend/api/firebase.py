import firebase_admin
from google.cloud.storage import Bucket
from firebase_admin import credentials, storage
from typing import List

################################################################# Initialization

def initialize_app() -> None:
	cred = credentials.Certificate('serviceAccountKey.json')
	if not firebase_admin._apps:
		firebase_admin.initialize_app(cred,{
			'storageBucket': 'test-3b97a.appspot.com'
		})

def initialize_bucket() -> Bucket:
	bucket = storage.bucket()
	return bucket

################################################################# CRUD

def ls(bucket: Bucket) -> List[str]:
	"""
	Returns the available files within the bucket
	"""
	return [f.name for f in bucket.list_blobs()]

def upload_from_filepath(bucket: Bucket, local_path: str, storage_path: str) -> bool:
	"""
	Grabs file from the path on local and uploads it to GCS

	Args:
		local_path (str) : path to the image/pdf on local filesystem, typically in /tmp/ [src]
		storage_path (str) : path to upload to in GCS. can be a subfolder such as test1/{}.jpg [dst]
	"""
	try:
		bucket.blob(storage_path).upload_from_filename(local_path)
		return True
	except Exception as e:
		print(e)
		return False
	
def download_from_filepath(bucket: Bucket, storage_path: str, local_path: str = "./tmp") -> bool:
	"""
	Grabs file from GCS and downloads it into /tmp/ folder

	Args:
		storage_path (str) : path to the file in GCS [src]
		local_path (str): where to dump the file in local filesystem [dst], by default is /tmp/
	"""
	try:
		bucket.blob(storage_path).download_to_filename(local_path)
		return True
	except Exception as e:
		print(e)
		return False
	
def delete_from_filepath(bucket: Bucket, storage_path: str) -> bool:
	"""
	Deletes specified file from GCS

	Args:
		storage_path (str) : path to the file in GCS [src]
	"""
	try:
		pass
	except:
		pass