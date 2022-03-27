import Amplify, { API, graphqlOperation } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { onCreateTodo, onUpdateTodo } from "../graphql/subscriptions";

export function useSubscription(subscriptionName = "onCreateTodo") {
  const [sub, setSub] = useState(null);

  let subInput = (nam) => {
    let tempRetObj;
    switch (nam) {
      case "onCreateTodo":
        tempRetObj = onCreateTodo;
        break;
      case "onUpdateTodo":
        tempRetObj = onUpdateTodo;
        break;
      default:
        tempRetObj = onCreateTodo;
        break;
    }
    return tempRetObj;
  };

  useEffect(() => {
    function handleSubscrip(chang) {
      setSub(chang);
    }
    API.graphql(graphqlOperation(subInput(subscriptionName))).subscribe({
      next: ({ provider, value }) => {
        console.log({ provider, value });
        handleSubscrip(value);
      },
      error: (error) => console.warn(error),
    });
  });

  // const subscription = API.graphql(
  //     graphqlOperation(subInput(subscriptionName))
  // ).subscribe({
  //     next: ({ provider, value }) => console.log({ provider, value }),
  //     error: error => console.warn(error)
  // });
  // return subscription;
  return sub;
}

// Stop receiving data updates from the subscription
// subscription.unsubscribe();import React, { useState, useEffect } from 'react';

// function FriendStatus(props) {
//     const [isOnline, setIsOnline] = useState(null);
//     useEffect(() => {
//       function handleStatusChange(status) {
//         setIsOnline(status.isOnline);
//       }
//       ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
//       return () => {
//         ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
//       };
//     });

//     if (isOnline === null) {
//       return 'Loading...';
//     }
//     return isOnline ? 'Online' : 'Offline';
//   }
