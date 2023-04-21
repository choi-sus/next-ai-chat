import { ElButton, ElInput } from '@/components';

interface ApiKeyFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  confirmApiKey: (e: React.FormEvent<HTMLFormElement>) => void;
  _onKeyPress: (e: React.KeyboardEvent<HTMLFormElement>) => void;
  apiKey: string;
  onChangeKey: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ApiKeyForm = ({
  confirmApiKey,
  _onKeyPress,
  apiKey,
  onChangeKey,
}: ApiKeyFormProps) => {
  return (
    <form onSubmit={confirmApiKey} onKeyPress={_onKeyPress}>
      <ElInput
        title="API KEY"
        value={apiKey}
        _onChange={(e) => onChangeKey(e)}
        placeholder="입력해 주세요."
      />
      <ElButton type="submit" margin="mt-220">
        Login
      </ElButton>
    </form>
  );
};

export default ApiKeyForm;
