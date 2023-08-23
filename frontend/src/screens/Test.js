import React from 'react';
import {Accordion} from 'react-bootstrap'

const countries = [
    {
      name: 'India' , Value:'IN', cities: [
        'Delhi',
        'Mumbai'
      ]
    },
    {
      name: 'pak', value:'PK', cities:[
        'Lahore',
        'Karachi'
      ]
    },
    {
      name:'Bangladesh', value: 'BG', cities:[
        'Dhaka',
        'Chitagong'
      ]
    },
  ];
  // write a program for hi
  

export default function Test() {
  return (
        <Accordion>
            {countries.map((item, index) => (
                <Accordion.Item key={index}>
                    <Accordion.Header>{item.name}</Accordion.Header>
                    <Accordion.Body>
                       {
                        item.cities.map((item, index) => (
                          <div key={index}>{item}</div>
                        ))
                       }
                    </Accordion.Body>
                </Accordion.Item>
            ))}
        </Accordion>
  );
}
