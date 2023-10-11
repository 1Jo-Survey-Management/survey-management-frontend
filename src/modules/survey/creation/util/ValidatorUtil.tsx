import { ValidationError } from 'class-validator';

/**
 * class-Validator 를 이용한 validation 처리에서
 * 메세지 속성값 만을 가져오기 위한 공통 처리 메서드입니다.
 * 따라서 해당 타입의 경우 여러 클래스가 들어올 수 있도록 any 타입을 사용하였고,
 * 그에 따라 eslint 규칙을 disable 하였습니다.
 *
 * @param validationClass class-Validator 클래스
 * @param validationErrors validate를 진행하고 나온 에러들
 * @returns class-Validator 에 지정해둔 message value string[]
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getValidationErrorMessage<T extends Record<string, any>>(
  validationClass: T,
  validationErrors: ValidationError[]
): string[] {
  const validationCalssField = Object.keys(validationClass);

  const errorMessages: string[] = validationErrors
    .filter((error) => validationCalssField.includes(error.property))
    .map((error) => {
      if (error.constraints) {
        return Object.values(error.constraints).join('\n');
      }
      return '';
    });

  return errorMessages;
}
