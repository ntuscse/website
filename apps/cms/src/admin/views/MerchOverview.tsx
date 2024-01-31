import React, { useEffect, useState } from "react";
import { Button } from "payload/components/elements";
import { AdminView } from "payload/config";
import ViewTemplate from "./ViewTemplate";
import StoreApi from "../../apis/store.api";

const MerchOverview: AdminView = ({ user, canAccessAdmin }) => {
  const [displayText, setDisplayText] = useState<string>(
    "We are currently preparing for the next merch sale. Please look forward to our email!"
  );
  const [isStoreDisabled, setIsStoreDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStoreStatus = async () => {
      const { disabled } = await StoreApi.getStoreStatus();
      setIsStoreDisabled(disabled);
      setLoading(false);
    };
    fetchStoreStatus();
  }, []);

  const disableStore = async () => {
    // TODO: Calls api to disable merch store
    setLoading(true);
    await StoreApi.setStoreStatus({
      displayText,
      disabled: !isStoreDisabled,
    });
    setIsStoreDisabled(!isStoreDisabled);
    setLoading(false);
  };
  return (
    <ViewTemplate
      user={user}
      canAccessAdmin={canAccessAdmin}
      description=""
      keywords=""
      title="Merchandise Overview"
    >
      <p>
        Here is a custom route that was added in the Payload config. It uses the
        Default Template, so the sidebar is rendered.
      </p>
      <Button el="link" to={"/admin"} buttonStyle="primary">
        Go to Main Admin View
      </Button>
      <p style={{ paddingTop: 20 }}>{`Current state of merch store: ${
        loading ? "..." : isStoreDisabled ? "Disabled" : "Live"
      }`}</p>
      {/* <textarea
        value={displayText}
        onChange={(e) => setDisplayText(e.target.value)}
        placeholder="Enter display text"
        rows={4}
        cols={50}
      /> */}
      <Button
        onClick={disableStore}
        disabled={loading}
        buttonStyle="primary"
        el="a"
      >
        Disable Store
      </Button>
    </ViewTemplate>
  );
};

export default MerchOverview;
