import { Center, Tooltip, Group } from "@mantine/core";
import {
  BarChartIcon,
  GearIcon,
  InfoCircledIcon,
  PersonIcon,
  TimerIcon,
} from "@radix-ui/react-icons";

import styles from "@styles/MainMenu.module.css";
import { useContext } from "react";
import { UserContext } from "@components/User/UserContext";

export default function MainMenu(props) {
  const { setPage } = props;

  const userDetails = useContext(UserContext);

  return (
    <>
      <Group className={styles.MainMenu} spacing="xs">
        <Center className={styles.Button}>
          <Tooltip label="Timer">
            <TimerIcon
              className={styles.SvgIcon}
              onClick={() => {
                setPage("timer");
              }}
            />
          </Tooltip>
        </Center>
        <Center className={styles.Button}>
          <Tooltip label="Settings">
            <GearIcon
              className={styles.SvgIcon}
              onClick={() => {
                setPage("settings");
              }}
            />
          </Tooltip>
        </Center>
        {userDetails && (
          <Center className={styles.Button}>
            <Tooltip label="Statistic">
              <BarChartIcon
                className={styles.SvgIcon}
                onClick={() => {
                  setPage("statistics");
                }}
                style={{ opacity: userDetails != null ? 1 : 0.2 }}
              />
            </Tooltip>
          </Center>
        )}
        <Center className={styles.Button}>
          <Tooltip label="About">
            <InfoCircledIcon
              className={styles.SvgIcon}
              onClick={() => {
                setPage("information");
              }}
            />
          </Tooltip>
        </Center>
        <Center className={styles.Button}>
          <Tooltip label="Login">
            <PersonIcon
              className={styles.SvgIcon}
              onClick={() => {
                setPage("user");
              }}
              style={{ opacity: userDetails != null ? 1 : 0.2 }}
            />
          </Tooltip>
        </Center>
      </Group>
    </>
  );
}
