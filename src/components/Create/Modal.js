import { useDisclosure } from '@mantine/hooks';
import { Modal, Text, Input,Button, Paper } from '@mantine/core';
import { MantineProvider, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ShareModal = ({ isOpen }) => {
  const [opened, { close }] = useDisclosure(isOpen);
  const [copySuccess, setCopySuccess] = useState(false);
  const theme = useMantineTheme();

  const copyToClipboard = () => {
    const copyText = document.getElementById('share-link');
    copyText.select();
    document.execCommand('copy');
    setCopySuccess(true);
  };

  const customStyles = {
    content: 'custom-content',
    item: 'custom-item',
    input: 'custom-modal-input',
    value: 'custom-value',
    values: 'custom-values',
    searchInput: 'custom-searchInput',
    itemsWrapper: 'custom-items-wrapper',
  };

  return (
    <>
      <MantineProvider theme={{ fontFamily: 'Jost', colorScheme: 'dark' }}>
        <Modal opened={opened} onClose={close} withCloseButton={false} centered classNames={customStyles} overlayProps={{
          opacity: 0.55,
          blur: 3,
        }}
        transitionProps={{ transition: 'fade', duration: 200 }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2>Raffle Created. Spread the Word!</h2>
            <Paper padding="lg" shadow="xs" style={{ width: '100%' }}>
              <Text
                sx={{ fontFamily: 'Poppins', fontSize: '0.99rem'}}
                ta="center"
                fz="xl"
                
              >
                Share this link with your friends:
              </Text>
              <div style={{ display: 'flex', alignItems: 'center', marginTop: '1rem' }}>
                <Input
                  id = "share-link"
                  value = "https://originx.0xc0d3rs.tech/raffles"
                  readOnly
                  style={{ flex: 1, marginRight: '1rem' }}
                  classNames={customStyles}
                />
                <Button
                  size="xs"
                  onClick={copyToClipboard}
                  disabled={copySuccess}
                  sx={{border: "0.0625rem solid #373a40", backgroundColor: "#1a1b1e"}}
                >
                  <FontAwesomeIcon icon="fa-regular fa-clone" />
                </Button>
              </div>
            </Paper>
          </div>
        </Modal>
      </MantineProvider>
    </>
  );
};

export default ShareModal;