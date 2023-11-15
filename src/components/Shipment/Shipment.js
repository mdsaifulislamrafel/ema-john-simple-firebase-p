import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import './Shipment.css';
import { UserContext } from '../../App';


const Shipment = () => {
    const { register, handleSubmit, formState: { errors },} = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
      const onSubmit = data => {
        console.log(data);
      }
      return (
        <form className='ship-form' onSubmit={handleSubmit(onSubmit)}>
          <input name='name' defaultValue={loggedInUser.name} {...register("exampleRequired", { required: true })} placeholder='Enter Your Name' />
          {errors.name && <span className='error'>This name is required</span>}

          <input name='email' defaultValue={loggedInUser.email} placeholder='Enter Your Email Address' {...register("exampleRequired", { required: true })} />
          {errors.email && <span className='error'>Email is required</span>}

          <input {...register("exampleRequired", { required: true })} name='address' placeholder='Enter Your Location'/>
          {errors.address && <span className='error'>This Address is required</span>}

          <input {...register("exampleRequired", { required: true })} name='phone' placeholder='Enter Your Phone Number'/>
          {errors.phone && <span className='error'>Phone Number is required</span>}
    
          <input type="submit" />
        </form>
      )
};

export default Shipment;