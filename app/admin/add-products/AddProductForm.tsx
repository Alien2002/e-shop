'use client'

import Button from "@/app/components/Button"
import Heading from "@/app/components/Heading"
import CategoryInput from "@/app/components/inputs/CategoryInput"
import CustomCheckbox from "@/app/components/inputs/CustomCheckbox"
import Input from "@/app/components/inputs/input"
import SelectColor from "@/app/components/inputs/SelectColor"
import TextArea from "@/app/components/inputs/TextArea"
import { categories } from "@/utilities/categories"
import { colors } from "@/utilities/colors"
import { useCallback, useEffect, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import firebaseApp from "@/libs/firebase"
import axios from "axios"
import { useRouter } from "next/navigation"

export type ImageType = {
  color: string,
  colorCode: string,
  image: File | null
}

export type UploadedImageType = {
  color: string,
  colorCode: string,
  image: string
}

const AddProductForm = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [images, setImages] = useState<ImageType[] | null>(null)
    const [isProductCreated, setIsProductCreated] = useState(false) 

    const router = useRouter()

    const {register, handleSubmit, setValue, watch, reset, formState: {errors}} = useForm<FieldValues>({
      defaultValues: {
        name: '',
        description: '',
        category: '',
        brand: '',
        inStock: false,
        images: [],
        price: ''
      }
    })

    useEffect(() => {
      setCustomValue('images', images)
    },[images]);

    useEffect(() => {
      if(isProductCreated){
        reset()
        setImages(null)
        setIsProductCreated(false)
      }
    },[isProductCreated])

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
      //uploading images to firebase............................................
      let uploadedImages: UploadedImageType[] = []

      //returning an error if category is not specified...
      if(!data.category) {
        setIsLoading(false)
        return toast.error('Category is not selected...')
      }
      //checking for images also...
      if(!data.images || data.images.length === 0) {
        setIsLoading(false)
        return toast.error('No selected Image...')
      }

      //handling the upload process....
      const handleImageUpload = async () => {
        toast('Creating product. Please wait...')
        //looping over images to upload...
        try {
          for (const item of data.images) {
            if(item.image){
              const fileName = new Date().getTime() + '-' + item.image.name

              //creating firebase storage...
              const storage = getStorage(firebaseApp);
              const storageRef = ref(storage, `products/${fileName}`)

              //uploading the file
              const uploadTask = uploadBytesResumable(storageRef, item.image)
              
              await new Promise<void>((resolve, reject) => {
                uploadTask.on('state_changed', 
                  (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Getting task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                      case 'paused':
                        console.log('Upload is paused');
                        break;
                      case 'running':
                        console.log('Upload is running');
                        break;
                    }
                  }, 
                  (error) => {
                    console.log("Error Uploading image....", error)
                    reject(error)
                  }, 
                  () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                      uploadedImages.push({
                        ...item,
                        image: downloadURL
                      })
                      console.log('File available at', downloadURL);
                      resolve()

                    }).catch((error) => {
                      console.log("Error while getting the download URL...", error)
                      reject(error)
                    });
                  }
                );
              })
            }
          }
        } catch (error) {
          setIsLoading(false)
          console.log('Error handling Images Upload...', error)
          return toast.error('Error handling Images Upload...')
        }
      }

      await handleImageUpload();
      const productData = {...data, images: uploadedImages}
      
      //posting the product to mongo database....
      axios.post('/api/product', productData).then(() => {
        toast.success('Product Successfully added...')
        setIsProductCreated(true)
        router.refresh()
      }).catch((error) => {
        toast.error('Something went wrong while connecting to database...')
        console.log('Errorr...>>>>>', error)
      }).finally(() => {
        setIsLoading(false)
      })
    }

    const category = watch('category');
    const setCustomValue = (id: string, value: any) => {
      setValue(id, value, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      })
    }

    //helper functions
    const addImageToState = useCallback((value: ImageType) => {
      setImages((prev) => {
        if(!prev){
          return [value]
        }

        return [...prev, value]
      })
    }, []);

    const removeImageFromState = useCallback((value: ImageType) => {
      setImages((prev) => {
        if(prev) {
          const filteredImages = prev.filter((item) => {item.color !== value.color})
          return filteredImages
        }

        return prev
      })
    },[])

  return (
    <>
      <Heading title="Add a Product" center />
      <Input 
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input 
        id="price"
        label="Price"
        disabled={isLoading}
        register={register}
        errors={errors}
        type='number'
        required
      />
      <Input 
        id="brand"
        label="Brand"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <TextArea 
        id="description"
        label="Description"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <CustomCheckbox 
        id="inStock"
        register={register}
        label="This product is in stock"
      />

      <div className="w-full font-medium">
          <div className="mb-2 font-semibold">Select a category</div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto">
            {categories.map((item) => {
              if(item.label === 'All') {
                return null
              }

              return <div key={item.label} className="col-span">
                <CategoryInput 
                  label = {item.label}
                  onclick={(category) => setCustomValue('category', category)}
                  selected = {category === item.label}
                  icon={item.icon}
                />
              </div>
            })}
          </div>
      </div>

      {/* {//Adding image....................} */}
      <div>
        <div>
            <div className="font-bold">Select the available product color and upload their images</div>
            <div className="text-sm">You must select an image for each of the color selected otherwise your selection will be ignored</div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {colors.map((item, index) => {
            return <SelectColor key={index} item={item} addImageToState={addImageToState} removeImageFromState={removeImageFromState} isProductCreated = {isProductCreated} />
          })}
        </div>
      </div>
      <Button label={isLoading? 'Loading...' : 'Add Product'} onclick={handleSubmit(onSubmit)} />

    </>
  )
}

export default AddProductForm