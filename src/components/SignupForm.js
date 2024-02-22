import React, { useEffect, useState } from 'react'
import { Form, Button, Label, Input, FormGroup } from "reactstrap"
import toast from 'react-hot-toast';
import { registerDeliveryAgent } from '../service/API';
import axios from 'axios';

const SignupForm = () => {
  const [agentDetails, setAgentDetails] = useState({
    name: "",
    email: "",
    mobileNUmber: "",
    password: "",
    confirmPass: "",
    address: "",
    pincode: "",
    city: "",
    lat: "",
    lon: ""
  });

  const getVisitorsIp = async () => {
    try {
      const response = await axios.get("https://api.ipify.org");
      getLocation(response.data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {

    getVisitorsIp();

  }, []);

  const getLocation = async (ipAddress) => {
    const response = await axios.get(`http://ip-api.com/json/${ipAddress}`);

    if (response.data.status === "success" && response.data.city && response.data.zip) {
      setAgentDetails({
        ...agentDetails,
        city: response.data.city,
        pincode: response.data.zip,
        lon: response.data.lon,
        lat: response.data.lat
      });
    }
  };


  const validation = () => {
    if (agentDetails.password !== agentDetails.confirmPass) {
      toast.error('Password and Confirm password sholud be same');
      return false;
    }

    if (agentDetails.password.length < 5) {
      toast.error("password should be more more than four charactors");
      return false;
    }
    return true;
  };

  const submitted = async (e) => {
    try {
      e.preventDefault();
      const isValidate = validation();
      if (isValidate) {
        const response = await registerDeliveryAgent(agentDetails.name, agentDetails.mobileNUmber, agentDetails.email, agentDetails.password, agentDetails.address, agentDetails.pincode, agentDetails.city, agentDetails.lon, agentDetails.lat);
        if (response.data.result) {
          setAgentDetails({
            ...agentDetails,
            name: "",
            email: "",
            mobileNUmber: "",
            password: "",
            confirmPass: "",
            address: "",
            pincode: "",
            city: "",
            lat: "",
            lon: ""
          });

          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='hole-form'>
      <div className='pb-2'>
        <div><h3 style={{ fontWeight: "500" }} className='text-center text-white'>Sign up</h3></div>
        <div className='form-container  '>
          <div className='p-2 ps-3 pe-3 pt-3'>
            <Form onSubmit={submitted}>
              <FormGroup>
                <Input
                  id="exampleEmail"
                  name="name"
                  placeholder=" name"
                  minLength={3}
                  type="text"
                  required
                  value={agentDetails.name}
                  onChange={(e) => setAgentDetails({ ...agentDetails, name: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="mobile number"
                  type="tel"
                  pattern="[0-9]{10}"
                  required
                  value={agentDetails.mobileNUmber}
                  onChange={(e) => setAgentDetails({ ...agentDetails, mobileNUmber: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <Label
                  for="exampleEmail"
                  hidden
                >
                  Email
                </Label>
                <Input
                  id="exampleEmail"
                  name="email"
                  placeholder="email"
                  type="email"
                  required
                  value={agentDetails.email}
                  onChange={(e) => setAgentDetails({ ...agentDetails, email: e.target.value })}
                />
              </FormGroup>
              {' '}
              <FormGroup>
                <Input
                  id="examplePassword"
                  name="password"
                  placeholder="Password"
                  type="password"
                  required
                  value={agentDetails.password}
                  onChange={(e) => setAgentDetails({ ...agentDetails, password: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  id="examplePassword1"
                  name="password1"
                  placeholder="confirm password"
                  type="password"
                  required
                  value={agentDetails.confirmPass}
                  onChange={(e) => setAgentDetails({ ...agentDetails, confirmPass: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <div className='d-flex gap-1'>
                  <Input
                    id="adress"
                    name="address"
                    placeholder="address"
                    type="text"
                    required
                    value={agentDetails.address}
                    onChange={(e) => setAgentDetails({ ...agentDetails, address: e.target.value })}
                  />
                  <Input
                    id="pincode"
                    name="pincode"
                    type='text'
                    maxLength={6}
                    required
                    pattern="[0-9]{6}"
                    placeholder="pincode"
                    value={agentDetails.pincode}
                    onChange={(e) => setAgentDetails({ ...agentDetails, pincode: e.target.value })}
                  />
                </div>
              </FormGroup>
              {' '}
              <FormGroup>
                <div className='d-flex gap-1'>
                  <Input
                    id="longitude"
                    name="longitude"
                    pattern="[0-9]+(\.[0-9]+)?"
                    placeholder="longitude"
                    type="text"
                    required
                    value={agentDetails.lon}
                    onChange={(e) => setAgentDetails({ ...agentDetails, lon: e.target.value })}
                  />
                  <Input
                    id="latitude"
                    name="latitude"
                    type='text'
                    required
                    placeholder='latitude'
                    pattern="[0-9]+(\.[0-9]+)?" value={agentDetails.lat}
                    onChange={(e) => setAgentDetails({ ...agentDetails, lat: e.target.value })}
                  />
                </div>
              </FormGroup>
              <FormGroup >
                <Input
                  id="city"
                  name="city"
                  placeholder="city"
                  type="text"
                  required
                  value={agentDetails.city}
                  onChange={(e) => setAgentDetails({ ...agentDetails, city: e.target.value })}
                />
              </FormGroup>
              <Button type='submit' className='colors '>
                SIGN UP
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupForm
