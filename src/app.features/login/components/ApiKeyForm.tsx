import { ElButton, ElInput } from '@/components';

interface ApiKeyFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  clickApiKeyConfirm: (e: React.FormEvent<HTMLFormElement>) => void;
  _onKeyPress: (e: React.KeyboardEvent<HTMLFormElement>) => void;
  apiKey: string;
  onChangeKey: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ApiKeyForm = ({
  clickApiKeyConfirm,
  _onKeyPress,
  apiKey,
  onChangeKey,
}: ApiKeyFormProps) => {
  return (
    <form onSubmit={clickApiKeyConfirm} onKeyPress={_onKeyPress}>
      <ElInput
        title="API KEY"
        value={apiKey}
        _onChange={(e) => onChangeKey(e)}
      />
      <ElButton type="submit" margin="mt-240">
        Login
      </ElButton>
    </form>
  );
};

export default ApiKeyForm;